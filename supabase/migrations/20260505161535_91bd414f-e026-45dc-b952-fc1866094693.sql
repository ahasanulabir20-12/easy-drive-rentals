-- Bookings table for car rental quote/booking requests
CREATE TABLE public.bookings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  pickup_location TEXT NOT NULL,
  destination TEXT NOT NULL,
  trip_date DATE,
  trip_type TEXT NOT NULL DEFAULT 'inside', -- 'inside' | 'outside'
  car_key TEXT NOT NULL,
  car_name TEXT NOT NULL,
  distance_km INTEGER,
  estimate_min INTEGER,
  estimate_max INTEGER,
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_email TEXT,
  message TEXT,
  source TEXT NOT NULL DEFAULT 'hero_widget', -- 'hero_widget' | 'contact_form'
  status TEXT NOT NULL DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT bookings_trip_type_check CHECK (trip_type IN ('inside','outside')),
  CONSTRAINT bookings_name_len CHECK (char_length(customer_name) BETWEEN 1 AND 120),
  CONSTRAINT bookings_phone_len CHECK (char_length(customer_phone) BETWEEN 5 AND 30),
  CONSTRAINT bookings_email_len CHECK (customer_email IS NULL OR char_length(customer_email) <= 255),
  CONSTRAINT bookings_msg_len CHECK (message IS NULL OR char_length(message) <= 1000),
  CONSTRAINT bookings_pickup_len CHECK (char_length(pickup_location) BETWEEN 1 AND 120),
  CONSTRAINT bookings_dest_len CHECK (char_length(destination) BETWEEN 1 AND 120)
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a booking request (public lead capture)
CREATE POLICY "Anyone can submit a booking"
  ON public.bookings FOR INSERT
  WITH CHECK (true);

-- Lock down all reads/updates/deletes from the public client.
-- Owner views data via the backend dashboard (uses service role, bypasses RLS).
CREATE POLICY "No public read"
  ON public.bookings FOR SELECT
  USING (false);

-- Timestamp trigger
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_bookings_updated_at
BEFORE UPDATE ON public.bookings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_bookings_created_at ON public.bookings (created_at DESC);
CREATE INDEX idx_bookings_status ON public.bookings (status);
