import { Metadata } from 'next';
import { BlogServiceServer } from "@/lib/services/blog-service-server";
import { BlogPostDetails } from "./blog-post-details";

// Definice dynamického renderování stránky - bude generována při každém požadavku
export const dynamic = 'force-dynamic';

// Toto je zakomentováno, protože nyní používáme dynamické renderování
// Pro statický export je toto povinné - musí vracet všechny možné hodnoty [slug]
// export async function generateStaticParams() {
//   try {
//     // Získat příspěvky z Firebase
//     const firebasePosts = await BlogService.getAllPosts();
//     
//     // Získat výchozí příspěvky z blogPosts
//     const defaultPostSlugs = blogPosts.map(post => post.id);
//     
//     // Kombinovat seznamy parametrů
//     const firebasePostSlugs = firebasePosts.map(post => post.id);
//     
//     // Přidat ručně problematické slugy
//     const additionalSlugs = ["titlle", "pep-ku-z-mo-odpus-te"];
//     
//     // Spojit všechny slugy a odstranit duplicity
//     const allSlugs = Array.from(new Set([...firebasePostSlugs, ...defaultPostSlugs, ...additionalSlugs]));
//     
//     return allSlugs.map(slug => ({
//       slug
//     }));
//   } catch (error) {
//     console.error("Error generating static params for blog posts:", error);
//     // Vrátit alespoň základní seznam včetně problematických slugů
//     return [
//       { slug: "titlle" },
//       { slug: "pep-ku-z-mo-odpus-te" },
//       { slug: "future-of-ai" },
//       { slug: "ai-productivity" },
//       { slug: "ai-ethics" }
//     ];
//   }
// }

// Generování metadat pro stránku blogu
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await BlogServiceServer.getPost(params.slug);
  
  if (!post) {
    return {
      title: 'Blog nenalezen',
      description: 'Požadovaný blog nebyl nalezen.'
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      type: 'article',
      locale: 'cs_CZ',
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  return <BlogPostDetails slug={params.slug} />;
}
