/*
  # Create blog posts table

  1. New Tables
    - `blog_posts`
      - `id` (uuid, primary key)
      - `title` (text, required)
      - `slug` (text, unique, required)
      - `excerpt` (text)
      - `content` (text)
      - `date` (date, required)
      - `read_time` (text)
      - `author` (text)
      - `cover_image` (text)
      - `status` (text, required)
      - `seo_title` (text)
      - `seo_description` (text)
      - `created_at` (timestamp with time zone)
      - `updated_at` (timestamp with time zone)
      - `user_id` (uuid, references auth.users)

  2. Security
    - Enable RLS on `blog_posts` table
    - Add policies for:
      - Authenticated users can read all published posts
      - Authors can read and write their own posts
      - Public can read published posts
*/

CREATE TABLE blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text,
  date date NOT NULL,
  read_time text,
  author text,
  cover_image text,
  status text NOT NULL DEFAULT 'draft',
  seo_title text,
  seo_description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  user_id uuid REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can read published posts"
  ON blog_posts
  FOR SELECT
  TO public
  USING (status = 'published');

CREATE POLICY "Authors can read own posts"
  ON blog_posts
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Authors can insert own posts"
  ON blog_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Authors can update own posts"
  ON blog_posts
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());