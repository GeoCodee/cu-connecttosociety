import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ProfileCardProps {
  name?: string;
  description?: string;
  tags?: string[];
  avatarUrl?: string;
}

export default function Component() {
  //props: ProfileCardProps

  const props: ProfileCardProps = "";

  const name = props.name ?? "Jane Doe";
  const description =
    props.description ??
    "Full-stack developer with a passion for creating intuitive and efficient web applications. Experienced in building scalable solutions and mentoring junior developers.";
  const tags = props.tags ?? [
    "React",
    "Node.js",
    "TypeScript",
    "UI/UX",
    "GraphQL",
    "AWS",
    "Docker",
  ];
  const avatarUrl = props.avatarUrl ?? "/placeholder.svg?height=200&width=200";

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-6 p-8">
        <Avatar className="h-32 w-32 sm:h-48 sm:w-48">
          <AvatarImage alt={name} src={avatarUrl} />
          <AvatarFallback className="text-4xl">
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold mb-2">{name}</h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {description}
          </p>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              variant="secondary"
              className="text-base px-3 py-1"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
