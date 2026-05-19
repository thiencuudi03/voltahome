"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const topic = formData.get("topic") as string;
  const message = formData.get("message") as string;

  try {
    await resend.emails.send({
      from: "VoltHome Contact <onboarding@resend.dev>",
      to: "thiencuudi@gmail.com",
      subject: `Yêu cầu tư vấn: ${topic}`,
      html: `
        <h2>Khách hàng mới từ VoltHome</h2>
        <p><strong>Họ tên:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Chủ đề:</strong> ${topic}</p>
        <p><strong>Nội dung:</strong><br/>${message}</p>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Lỗi gửi email:", error);
    return { success: false };
  }
}
