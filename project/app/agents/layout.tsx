import { agentsMetadata } from '../metadata';

export const metadata = agentsMetadata;

export default function AgentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 