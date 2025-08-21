export interface Planet {
    id: number;
    planetName: string;
    planetColor: string;
    planetRadiusKM: number;
    distInMillionsKM: PlanetDistance;
    description: string;
    imageUrl: string;
    imageName: string;
}

export interface PlanetDistance {
    fromSun: number;
    fromEarth: number;
}
