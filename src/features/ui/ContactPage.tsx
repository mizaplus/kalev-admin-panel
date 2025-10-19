import ContactProvider from "../domain/context/contact-context";
import ContactSections from "../useCases/contact/EditableSections";

export default function ContactPage() {
  return (
    <ContactProvider>
      <section className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight">Contact Us</h1>
        <p className="text-sm text-muted-foreground">
          Add quick contact details and embed forms or location maps in this
          section.
        </p>
      </section>
      <ContactSections />
    </ContactProvider>
  );
}
