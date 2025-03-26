import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function RecordNotes({ notes }: { notes: string[] }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="notes">
        <AccordionTrigger>Notas</AccordionTrigger>
        <AccordionContent>
          <ul>
            {notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
