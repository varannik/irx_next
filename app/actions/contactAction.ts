'use server';

import { getCollection } from '@/utils/dbActions/getCollection';
interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    message: string;
  }

const c = await getCollection('Contacts');

export async function ContactFormAction(formData:FormData) {
  const { firstName, lastName, email, phoneNumber, message } = formData;

  try {

    await c.insertOne({
      firstName,
      lastName,
      email,
      phoneNumber,
      message,
      createdAt: new Date(),
    });

    return { success: true };
  } catch (error) {
    console.error('Error saving to MongoDB:', error);
    return { error: 'Failed to submit form. Please try again later.' };
  }
}
