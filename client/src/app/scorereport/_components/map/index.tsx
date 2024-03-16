// import Map from "../scorereport/_components/map";
"use client"

import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";

type PropType = {
	source: string,
	destination: string
}

export default function Map(prop: PropType) {
	// !This is loaded twice? once in #getscore
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?
			process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : 'uh oh',
		libraries: ["places"],
	});

	if (!isLoaded) return <div>Loading...</div>;
	return <GMap source={prop.source} />;
}

const containerStyle = {
	width: '800px',
	height: '400px'
};

function GMap({ source }: { source: string }) {
	const [center, setCenter] = useState({ lat: 0, lng: 0 });
	useEffect(() => {
		const load = async () => {
			const results = await getGeocode({ address: source });
			const { lat, lng } = getLatLng(results[0]);
			setCenter({ lat, lng });
		}

		load();
	}, [source]);

	return (
		<GoogleMap zoom={10} center={center} mapContainerStyle={containerStyle}>
			<Marker position={center} />
		</GoogleMap>
	);
}