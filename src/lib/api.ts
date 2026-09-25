import {
  ApiCreateInquiry,
  ApiExchangeRate,
  ApiProperty,
  ApiPropertyList,
  ApiSettings,
} from '@/types/api';

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api';

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init?.body ? { 'Content-Type': 'application/json' } : {}),
      ...init?.headers,
    },
  });
  if (!response.ok) {
    let message = `Error ${response.status}`;
    try {
      const payload = (await response.json()) as { message?: string | string[] };
      if (typeof payload.message === 'string') message = payload.message;
      else if (Array.isArray(payload.message)) message = payload.message.join(', ');
    } catch {
      // sin cuerpo JSON: mantener mensaje genérico
    }
    throw new Error(message);
  }
  if (response.status === 204) return undefined as T;
  return (await response.json()) as T;
}

export function getProperties(limit = 100): Promise<ApiPropertyList> {
  return request<ApiPropertyList>(`/properties?limit=${limit}`);
}

export function getSettings(): Promise<ApiSettings> {
  return request<ApiSettings>('/settings');
}

export function getExchangeRate(): Promise<ApiExchangeRate> {
  return request<ApiExchangeRate>('/exchange-rate');
}

export function createInquiry(payload: ApiCreateInquiry): Promise<unknown> {
  return request<unknown>('/inquiries', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}