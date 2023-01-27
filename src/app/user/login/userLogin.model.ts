/**
 * @author Almira Shaikh
 * @description "Model for login"
 */
export class userLogin {
    public id: number;
    public email: string;
    public password: string;

    constructor(
        id: number,
        email: string,
        password: string
    ) {
        this.id = id;
        this.email = email;
        this.password = password;
    }


}