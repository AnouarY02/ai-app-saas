import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export type TaskFormProps = {
  initialTask?: {
    id: string;
    title: string;
    description?: string;
  };
  onSubmit: (formData: FormData) => void;
};

export function TaskForm({ initialTask, onSubmit }: TaskFormProps) {
  return (
    <form action={onSubmit} className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>{initialTask ? "AI-taak bewerken" : "Nieuwe AI-taak toevoegen"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="title">Titel</label>
            <Input
              id="title"
              name="title"
              defaultValue={initialTask?.title || ""}
              required
              maxLength={100}
              className="w-full"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium" htmlFor="description">Beschrijving</label>
            <Textarea
              id="description"
              name="description"
              defaultValue={initialTask?.description || ""}
              maxLength={500}
              className="w-full"
              rows={4}
            />
          </div>
          <Button type="submit">Opslaan</Button>
        </CardContent>
      </Card>
    </form>
  );
}
