export default class Item {
    id: number;
    nom: string;
    prix: number;
    quantity: number;
    constructor(data) {
        this.id = data.id;
        this.nom = data.nom;
        this.prix = data.prix;
        this.quantity = data.quantity;
    }
}
