import { NextResponse } from "next/server";
import { Resend } from "resend";

function translateFrequency(frequency: string): string {
    const map: Record<string, string> = {
        once: "Engång",
        weekly: "Varje vecka",
        biweekly: "Varannan vecka",
        monthly: "Var fjärde vecka",
    };
    return map[frequency] ?? frequency;
}

function translateCustomerType(type: string): string {
    return type === "foretag" ? "Företag" : "Privat";
}

function emailTemplate(fields: {
    name: string;
    email: string;
    phone: string;
    location: string;
    service: string;
    size: string;
    frequency: string;
    message: string;
    customerType: string;
    companyName?: string;
}): string {
    const rows = [
        fields.companyName
            ? { label: "Företag", value: fields.companyName }
            : null,
        { label: "Kundtyp", value: translateCustomerType(fields.customerType) },
        { label: "Namn", value: fields.name },
        {
            label: "E-post",
            value: `<a href="mailto:${fields.email}" style="color:#1e3a5f;text-decoration:none;">${fields.email}</a>`,
        },
        {
            label: "Telefon",
            value: `<a href="tel:${fields.phone}" style="color:#1e3a5f;text-decoration:none;">${fields.phone}</a>`,
        },
        { label: "Stad / Område", value: fields.location },
        { label: "Tjänst", value: fields.service },
        { label: "Storlek", value: `${fields.size} kvm` },
        { label: "Frekvens", value: translateFrequency(fields.frequency) },
    ]
        .filter(Boolean)
        .map(
            (row) => `
            <tr>
                <td style="padding:12px 16px;background:#f8fafc;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;white-space:nowrap;border-bottom:1px solid #e2e8f0;width:160px;">
                    ${row!.label}
                </td>
                <td style="padding:12px 16px;font-size:15px;color:#1e3a5f;border-bottom:1px solid #e2e8f0;">
                    ${row!.value}
                </td>
            </tr>`,
        )
        .join("");

    return `
<!DOCTYPE html>
<html lang="sv">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Ny offertförfrågan</title>
</head>
<body style="margin:0;padding:0;background:#f1f5f9;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f1f5f9;padding:40px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:#1e3a5f;border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <p style="margin:0 0 8px 0;font-size:11px;font-weight:700;letter-spacing:0.3em;text-transform:uppercase;color:#f59e0b;">
                Renovix Nordic
              </p>
              <h1 style="margin:0;font-size:26px;font-weight:700;color:#ffffff;line-height:1.3;">
                Ny offertförfrågan
              </h1>
              <p style="margin:10px 0 0 0;font-size:14px;color:#94a3b8;">
                En kund har skickat in en förfrågan via webbplatsen
              </p>
            </td>
          </tr>

          <!-- Info table -->
          <tr>
            <td style="background:#ffffff;padding:0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${rows}
              </table>
            </td>
          </tr>

          <!-- Message -->
          <tr>
            <td style="background:#ffffff;padding:0 0 8px 0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:24px 40px 8px 40px;">
                    <p style="margin:0 0 10px 0;font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.08em;color:#94a3b8;">
                      Meddelande
                    </p>
                    <div style="background:#f8fafc;border-left:4px solid #f59e0b;border-radius:4px;padding:16px 20px;font-size:15px;color:#1e3a5f;line-height:1.7;">
                      ${fields.message.replace(/\n/g, "<br/>")}
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA -->
          <tr>
            <td style="background:#ffffff;padding:24px 40px 36px 40px;text-align:center;">
              <a href="mailto:${fields.email}"
                 style="display:inline-block;background:#f59e0b;color:#1e3a5f;font-weight:700;font-size:14px;text-decoration:none;padding:14px 32px;border-radius:10px;letter-spacing:0.02em;">
                Svara på förfrågan →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#1e3a5f;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#64748b;line-height:1.6;">
                Detta mail skickades automatiskt från kontaktformuläret på
                <a href="https://renovixnordic.se" style="color:#f59e0b;text-decoration:none;">renovixnordic.se</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(req: Request) {
    try {
        console.log("1. POST started");
        console.log("RESEND_API_KEY exists:", !!process.env.RESEND_API_KEY);
        console.log("CONTACT_EMAIL:", process.env.CONTACT_EMAIL);

        const resend = new Resend(process.env.RESEND_API_KEY);
        const CONTACT_EMAIL = process.env.CONTACT_EMAIL!;
        const formData = await req.formData();
        console.log("2. formData parsed");

        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const phone = formData.get("phone") as string;
        const service = formData.get("service") as string;
        const message = formData.get("message") as string;
        const customerType = formData.get("customerType") as string;
        const companyName = formData.get("company-name") as string;
        const size = formData.get("size") as string;
        const frequency = formData.get("frequency") as string;
        const location = formData.get("location") as string;

        console.log("3. fields:", { name, email, service });

        if (!name || !email || !message) {
            console.log("4. Missing required fields");
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 },
            );
        }

        const images = formData.getAll("images") as File[];
        let attachments: {
            filename: string;
            content: string;
            contentType: string;
        }[] = [];
        try {
            attachments = await Promise.all(
                images
                    .filter((file) => file.size > 0)
                    .map(async (file) => {
                        const bytes = new Uint8Array(await file.arrayBuffer());
                        const binary = bytes.reduce(
                            (acc, byte) => acc + String.fromCharCode(byte),
                            "",
                        );
                        return {
                            filename: file.name,
                            content: btoa(binary),
                            contentType: file.type,
                        };
                    }),
            );
            console.log("5. attachments processed:", attachments.length);
        } catch (attachErr) {
            console.error("5. Attachment error:", attachErr);
            attachments = [];
        }

        console.log("6. Sending email to:", CONTACT_EMAIL);

        const { error: resendError } = await resend.emails.send({
            from: "Renovix Nordic <noreply@renovixnordic.se>",
            to: [CONTACT_EMAIL],
            replyTo: [email],
            subject: `Ny förfrågan: ${service} från ${name}`,
            html: emailTemplate({
                name,
                email,
                phone,
                location,
                service,
                size,
                frequency,
                message,
                customerType,
                companyName: companyName || undefined,
            }),
            attachments,
        });

        console.log("7. Resend result:", resendError ?? "success");

        if (resendError) {
            console.error("Resend error:", resendError);
            return NextResponse.json(
                { error: resendError.message },
                { status: 500 },
            );
        }

        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Internal server error";
        console.error("Contact error:", message);
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
