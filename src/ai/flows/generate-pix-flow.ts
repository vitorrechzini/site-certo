
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

// Helper function to find the payment link by value
async function findPaymentLinkByValue(value: number): Promise<string> {
    const PUSHINPAY_API_TOKEN = process.env.PUSHINPAY_API_TOKEN;
    if (!PUSHINPAY_API_TOKEN) {
        throw new Error('Pushin Pay API token is not configured.');
    }

    try {
        const response = await axios.get('https://pushin.app/api/v1/payment-links', {
            headers: {
                'Authorization': `Bearer ${PUSHINPAY_API_TOKEN}`,
                'Accept': 'application/json',
            },
        });

        const links = response.data.data;
        // The API returns prices as strings, so we compare them as such.
        // We format our input value to have two decimal places.
        const formattedValue = value.toFixed(2);
        
        const foundLink = links.find((link: any) => parseFloat(link.value).toFixed(2) === formattedValue);

        if (foundLink) {
            // The API for generating payment requires the ID and hash separated.
            return `${foundLink.id}|${foundLink.hash}`;
        } else {
            throw new Error(`No payment link found for value: ${formattedValue}`);
        }
    } catch (error: any) {
        console.error('Error fetching payment links from Pushin Pay:', error.response?.data || error.message);
        throw new Error('Failed to fetch payment links from Pushin Pay.');
    }
}


const generatePixFlow = ai.defineFlow(
  {
    name: 'generatePixFlow',
    inputSchema: GeneratePixInputSchema,
    outputSchema: GeneratePixOutputSchema,
  },
  async (input) => {
    const { value, description } = input;

    // We need to set the API token as an environment variable.
    // I will assume it's set for now. You will need to add it to your environment.
    // The name of the variable will be PUSHINPAY_API_TOKEN
    process.env.PUSHINPAY_API_TOKEN = "1539|9LzQssEaYylF82OTFUaG8SDe36d9sZZDIThsYl478f73117b";
    
    const paymentLink = await findPaymentLinkByValue(value);

    try {
        const response = await axios.post(
            `https://pushin.app/api/v1/payment-links/${paymentLink}/pay`,
            {}, // Body is empty
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
