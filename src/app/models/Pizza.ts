export default class Pizza {
    id: number;
    nom: string;
    prix: number;
    photo: string;
    ingredients: number[];
    constructor(data) {
        this.id = data.id;
        this.nom = data.nom;
        this.prix = data.prix;
        this.photo = data.photo;
        this.ingredients = data.ingredients;
    }
}
