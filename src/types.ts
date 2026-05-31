/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  type: string;
  price: number;
  image: string;
  category: 'T-Shirts' | 'Hoodies' | 'Other';
  description?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface Track {
  title: string;
  year: string;
  duration: string;
  spotifyUrl: string;
  albumArt: string;
  type: 'Single' | 'EP' | 'Album';
}

export interface BookingInquiry {
  name: string;
  email: string;
  inquiryType: string;
  message: string;
}
