export interface Launchpad {
  images: {
    large: string[];
  };
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  timezone: string;
  launches: string[];
  status: string;
  details: string;
  id: string;
}