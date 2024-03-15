import { Feature } from "geojson";

export interface EventType {
	id: string;
	title: string;
	startTime: string;
	latitude: number;
	longitude: number;
	geoJson: Feature;
}
