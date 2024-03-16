// import Map from "../scorereport/_components/map";
"use client"

import { useState, useMemo, useEffect } from "react";
import { GoogleMap, useLoadScript, Marker, Polyline } from "@react-google-maps/api";
import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";

export default function Map({ source, destination }: { source: string, destination: string }) {
	// !This is loaded twice? once in #getscore
	const { isLoaded: isLoadedPlaces } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?
			process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : 'uh oh',
		libraries: ["places"],
	});

	const { isLoaded: isLoadedDrawing } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?
			process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY : 'uh oh',
		libraries: ["drawing"],
	});

	if (!(isLoadedPlaces && isLoadedDrawing)) return <div>Loading...</div>;
	return <GMap source={source} destination={destination} />;
}

const containerStyle = {
	width: '800px',
	height: '400px'
};

function GMap({ source, destination }: { source: string, destination: string }) {
	const [center, setCenter] = useState({ lat: 0, lng: 0 });
	const [des, setDes] = useState({ lat: 0, lng: 0 });

	const [direction, setDirection] = useState([{lat: 0, lng: 0}]);

	useEffect(() => {
		const load = async () => {
			let results = await getGeocode({ address: source });
			let { lat: lat1, lng: lng1 } = getLatLng(results[0]);
			setCenter({ lat: lat1, lng: lng1 });

			results = await getGeocode({ address: destination });
			let { lat: lat2, lng: lng2 } = getLatLng(results[0]);
			setDes({ lat: lat2, lng: lng2 });

			// this is a patch up work, might need to check docs
			// https://developers.google.com/maps/documentation/javascript/directions#TravelModes
			// ! TESTING directional service (API is configured for this atm)
			// const directionsService = new google.maps.DirectionsService();
			// directionsService.route(
			// 	{
			// 	  origin: origin,
			// 	  destination: destination,
			// 	  travelMode: 'TRANSIT' as google.maps.TravelMode
			// 	},
			// 	(result, status) => {
			// 	  if (status === google.maps.DirectionsStatus.OK) {
			// 		setDirections(result);
			// 		console.log(result)
			// 	  } else {
			// 		// unhandled error here, not sure what to do atm
			// 	  }
			// 	}
			// )
			setDirection([{ lat: lat1, lng: lng1 }, { lat: lat2, lng: lng2 }]);
		}

		load();
	}, [source, destination]);

	return (
		<GoogleMap zoom={10} center={center} mapContainerStyle={containerStyle}>
			<Marker position={center} />
			<Marker position={des} />
			<Polyline path={direction} />
		</GoogleMap>
	);
}