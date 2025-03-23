/*
  # Create blog post tags table

  1. New Tables
    - `blog_post_tags`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references blog_posts)
      - `tag` (text)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `blog_post_tags` table
    - Add policies for:
      - Public can read tags
      - Authors can manage tags for their posts
*/

CREATE TABLE blog_post_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Public can read tags"
  ON blog_post_tags
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authors can manage post tags"
  ON blog_post_tags
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM blog_posts
      WHERE blog_posts.id = blog_post_tags.post_id
      AND blog_posts.user_id = auth.uid()
    )
  );