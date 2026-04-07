import type { RepoData } from './types';
import reposData from '../data/repos.json';

export function getAllRepos(): RepoData[] {
  return (reposData as RepoData[]).sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export function getVisibleRepos(): RepoData[] {
  return getAllRepos().filter((r) => r.visible);
}

export function getByTier(tier: RepoData['tier']): RepoData[] {
  return getVisibleRepos().filter((r) => r.tier === tier);
}

export function getFeatured(): RepoData[] {
  return getByTier('featured');
}

export function getRepoLanguages(r: RepoData): string[] {
  if (r.languages && r.languages.length > 0) return r.languages;
  return r.language ? [r.language] : [];
}

export function getLanguages(): string[] {
  const langs = new Set(getVisibleRepos().flatMap(getRepoLanguages));
  return Array.from(langs).sort();
}

export function getDomains(): string[] {
  const domains = new Set(getVisibleRepos().flatMap((r) => r.domain));
  return Array.from(domains).sort();
}
