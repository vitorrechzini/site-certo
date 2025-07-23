
'use server';
/**
 * @fileOverview A flow to generate a PIX payment using Pushin Pay API.
 *
 * - generatePix - A function that handles the PIX generation process.
 * - GeneratePixInput - The input type for the generatePix function.
 * - GeneratePixOutput - The return type for the generatePix function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import axios from 'axios';

const GeneratePixInputSchema = z.object({
  value: z.number().describe('The value of the PIX payment.'),
  description: z.string().describe('The description of the product or service.'),
});
type GeneratePixInput = z.infer<typeof GeneratePixInputSchema>;

const GeneratePixOutputSchema = z.object({
  qr_code_image: z.string().describe('The base64 encoded QR code image.'),
  qr_code_text: z.string().describe('The PIX copy-and-paste code.'),
});
type GeneratePixOutput = z.infer<typeof GeneratePixOutputSchema>;

// Map plan IDs to Pushin Pay payment links
const pushinLinks: { [key: string]: string } = {
  vitalicio: "39346|qhlkY74PrEoKSvVlQ0mm1ab6JrRfp0OuFO01HaTyf022ec31",
  mensal: "39347|168K7tm1DBhQmo8PuxHX1pL3UaD2ibfbcFzw7yf569f8600f",
  semanal: "39349|WmV9KwWFH4pDUKyrjb9Ygg2WgEXm8ZJco5tCyLFdacafaba0"
};

const generatePixFlow = ai.defineFlow(
  {
    name: 'generatePixFlow',
    inputSchema: GeneratePixInputSchema,
    outputSchema: GeneratePixOutputSchema,
  },
  async (input) => {
    const { value, description } = input;
    
    let planId = 'vitalicio'; // default
    if (value === 14.90) planId = 'mensal';
    if (value === 9.90) planId = 'semanal';

    const paymentLink = pushinLinks[planId];
    if (!paymentLink) {
        throw new Error('Invalid plan selected');
    }

    try {
        const response = await axios.post(
            `https://pushin.app/api/v1/payment-links/${paymentLink}/pay`,
            {}, // Body can be empty if value and description are in the URL
            {
                params: {
                    value,
                    description,
                },
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            }
        );

        const data = response.data;

        if (response.status === 200 && data.qr_code_image && data.qr_code_text) {
            return {
                qr_code_image: data.qr_code_image,
                qr_code_text: data.qr_code_text,
            };
        } else {
            console.error('Pushin Pay API Error:', data);
            throw new Error('Failed to generate PIX. Unexpected response from Pushin Pay.');
        }
    } catch (error: any) {
        console.error('Error calling Pushin Pay API:', error.response?.data || error.message);
        throw new Error('Failed to communicate with the payment provider.');
    }
  }
);


export async function generatePix(input: GeneratePixInput): Promise<GeneratePixOutput> {
    return generatePixFlow(input);
}
