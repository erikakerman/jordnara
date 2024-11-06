import { Spa, Grass, LocalFlorist, Agriculture } from '@mui/icons-material';

// Import images
import carrotImage from '../assets/carrot.jpg';
import potatoImage from '../assets/potato.jpg';
import cornImage from '../assets/corn.jpg';
import cabbageImage from '../assets/cabbage.jpg';
import beetrootImage from '../assets/beetroot.jpg';
import onionImage from '../assets/onion.jpg';

export const crops = [
    {
        id: 1,
        name: "Carrot",
        pricePerKg: 50,
        growingPeriodDays: 70,
        Icon: Spa,
        image: carrotImage
    },
    {
        id: 2,
        name: "Potato",
        pricePerKg: 40,
        growingPeriodDays: 90,
        Icon: Agriculture,
        image: potatoImage
    },
    {
        id: 3,
        name: "Corn",
        pricePerKg: 45,
        growingPeriodDays: 80,
        Icon: Grass,
        image: cornImage
    },
    {
        id: 4,
        name: "Cabbage",
        pricePerKg: 35,
        growingPeriodDays: 65,
        Icon: LocalFlorist,
        image: cabbageImage
    },
    {
        id: 5,
        name: "Beetroot",
        pricePerKg: 55,
        growingPeriodDays: 60,
        Icon: Spa,
        image: beetrootImage
    },
    {
        id: 6,
        name: "Onion",
        pricePerKg: 30,
        growingPeriodDays: 75,
        Icon: LocalFlorist,
        image: onionImage
    }
];