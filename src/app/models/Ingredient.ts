export default class Ingredient {
    id: number;
    nom: string;
    constructor(data) {
        this.id = data.id;
        this.nom = data.nom;
    }
}
