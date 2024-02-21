import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import 'leaflet/dist/leaflet.css';
import L, { popup } from 'leaflet';
import 'leaflet.vectorgrid';
import IconMarker from '../Data/avion.png';
import getColor from '../Fonctions/GetCrimeColor';
import getCost from '../Fonctions/GetColColor';
import data from '../Data/output.json';
import Unesco from '../Data/unesco.json';
import Loading from '../Components/Loading';
import LegendCrime from '../Fonctions/LegendCrime';
import LegendCost from '../Fonctions/LegendCost';

function Map() {
	const mapContainer = useRef();
	const [displayCrime, setDisplayCrime] = useState(false);
	const [displayCost, setDisplayCost] = useState(false);
	const [displayUnesco, setDisplayUnesco] = useState(false);
	const [location, setLocation] = useState([48.85341, 2.3488]);
	const [loading, setLoading] = useState(false);

	const mapConfig = useMemo(
		() => ({
			attributionControl: false,
			zoom: 6,
			center: location,
			minZoom: 3.5,
			maxZoom: 14,
		}),
		[location]
	);

	const crimeLayer = useMemo(() => {
		if (displayCrime) {
			return L.vectorGrid.slicer(data, {
				vectorTileLayerStyles: {
					sliced: function (properties) {
						const crimeValue = properties.crime;
						const fillColor = getColor(crimeValue);

						return {
							fillColor: fillColor,
							fill: true,
							fillOpacity: 0.5,
							stroke: true,
							weight: 1,
							opacity: 0.2,
							color: '#000',
						};
					},
				},
				rendererFactory: L.svg.tile,
			});
		}
		return null;
	}, [displayCrime]);
	const costOfLivingLayer = useMemo(() => {
		if (displayCost) {
			return L.vectorGrid.slicer(data, {
				vectorTileLayerStyles: {
					sliced: function (properties) {
						const costOfLiving = properties.COL;
						const fillColor = getCost(costOfLiving);
						return {
							fillColor: fillColor,
							fill: true,
							fillOpacity: 0.5,
							stroke: true,
							weight: 1,
							opacity: 0.2,
							color: '#000',
						};
					},
				},
				rendererFactory: L.svg.tile,
			});
		}
	});

	/* marker */
	function getIcon() {
		return L.icon({
			iconUrl: IconMarker,
			iconSize: [50, 50],
		});
	}
	function handleToggleCrime() {
		setDisplayCrime(!displayCrime);
		setDisplayCost(false);
	}
	function handleToggleUnesco() {
		setDisplayUnesco(!displayUnesco);
	}
	function handleCost() {
		setDisplayCost(!displayCost);
		setDisplayCrime(false);
	}

	/* onclick coordoner aleatoire */
	const handleRandomLocation = async () => {
		const randomCoordinates = await getRandomCoordinates();
		setLocation(randomCoordinates);
	};

	const getRandomCoordinates = async () => {
		try {
			setLoading(true);
			const randomLat = Math.random() * (90 - -90) + -90;
			const randomLong = Math.random() * (180 - -180) + -180;
			const response = await fetch(
				`https://nominatim.openstreetmap.org/reverse?format=json&lat=${randomLat}&lon=${randomLong}`
			);
			const data = await response.json();

			if (data.address && data.address.country) {
				return [randomLat, randomLong];
			} else {
				return getRandomCoordinates();
			}
		} finally {
			setTimeout(() => {
				setLoading(false);
			}, 500);
		}
	};

	useEffect(() => {
		const map = L.map(mapContainer.current, mapConfig);

		L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
			noWrap: false,
			attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
		}).addTo(map);

		L.marker(location, { icon: getIcon() }).addTo(map);

		if (crimeLayer) {
			crimeLayer.addTo(map);
		}
		if (costOfLivingLayer) {
			costOfLivingLayer.addTo(map);
		}

		/* Toogle affichage lieux unesco. nessecite leaflet version 1.2 */
		let unescoLayer;
		if (displayUnesco) {
			unescoLayer = L.vectorGrid
				.slicer(Unesco, {
					rendererFactory: L.svg.tile,
					vectorTileLayerStyles: {
						sliced: function () {
							return {
								fillColor: 'blue',
								fillOpacity: 0.3,
								radius: 10,
								fill: true,
								stroke: true,
								color: '#000',
								weight: 0.5,
							};
						},
					},
					interactive: true,
					getFeatureId: function (f) {
						return f.properties.description;
					},
				})
				.on('mouseover', function (e) {
					let unescoProperties = e.layer.properties;

					L.popup({
						className: 'test',
					})
						.setContent(unescoProperties.description)
						.setLatLng(e.latlng)
						.openOn(map);
				})
				.addTo(map);
		}

		return () => map.remove();
	}, [location, mapConfig, crimeLayer, displayUnesco, displayCost]);

	return (
		<>
			<nav className="absolute top-[2vh] left-[50vw] z-20 flex flex-col gap-3 md:flex-row ">
				<button className=" relative text-blue-950 " onClick={handleRandomLocation}>
					<span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
					<span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-blue-400 hover:text-gray-900 dark:bg-transparent">
						Voyages aléatoire
					</span>
				</button>
				<button className=" relative text-blue-950" onClick={handleToggleCrime}>
					<span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
					<span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-blue-400 hover:text-gray-900 dark:bg-transparent">
						Crime
					</span>
				</button>
				<button className=" relative text-blue-950" onClick={handleToggleUnesco}>
					<span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
					<span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-blue-400 hover:text-gray-900 dark:bg-transparent">
						Unesco
					</span>
				</button>
				<button className=" relative text-blue-950" onClick={handleCost}>
					<span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
					<span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-100 hover:bg-blue-400 hover:text-gray-900 dark:bg-transparent">
						Cout de la vie
					</span>
				</button>
			</nav>
			{loading && <Loading />}

			<div className="absolute z-10 bottom-[2vh] left-[1vw] ">
				<span className="absolute top-0 left-0 mt-1 ml-1 h-full w-full rounded bg-black"></span>
				<span className="fold-bold relative inline-block h-[80px] w-[400px] rounded border-2 border-black bg-blue-400 font-bold ">
					Legend :{displayCrime ? <LegendCrime /> : displayCost ? <LegendCost /> : null}
				</span>
			</div>

			<div style={{ padding: 0, margin: 0, width: '100vw', height: '100vh' }} ref={mapContainer}></div>
		</>
	);
}

export default Map;
