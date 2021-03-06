import { getToken } from "./token";

class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    createCard(serverCard) {
        return {
          src: serverCard.link,
          alt: serverCard.name,
          description: serverCard.name,
          likes: serverCard.likes,
          likesAmount: serverCard.likes.length,
          id: serverCard._id,
          ownerId: serverCard.owner,
        }
      }

    async getInitialCards() {
        const response = await this.makeApiRequest(`${this.baseUrl}/cards`, {
            method: 'GET',
            headers: this.headers
        });
        const content = await this._getResponseData(response);
        return content;
    }

    editProfile(formValues) {
        return this.makeApiRequest(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: formValues.name,
                about: formValues.about
            })
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    addNewCard(pictureLink, pictureDescription) {
        return this.makeApiRequest(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                link: pictureLink,
                name: pictureDescription
            })
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    deleteCard(cardId) {
        return this.makeApiRequest(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            return this.makeApiRequest(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: 'PUT',
                headers: this.headers
            })
                .then(res => {
                    return this._getResponseData(res);
                });
        }
        else {
            return this.makeApiRequest(`${this.baseUrl}/cards/${cardId}/likes`, {
                method: 'DELETE',
                headers: this.headers
            })
                .then(res => {
                    return this._getResponseData(res);
                });
        }
    }

    changeAvatar(avatarLink) {
       return this.makeApiRequest(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            body: JSON.stringify({
                avatar: avatarLink,
            }),
            headers: this.headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    _getResponseData(res){
        if (res.ok) {
            return res.json();
        }
/*         res.json()
            .then((content) => {
                return content;
            })
            .catch((err) => {
                return err;
            }); */
        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }
    
    makeApiRequest(url, config) {
        const token = getToken();

        if (!token) {
            return;
        }
        if (!config.headers) {
            config.headers = { authorization: `Bearer ${token}` };
        } else {
            config.headers.authorization = `Bearer ${token}`;
        }

        return fetch(url, config);
    }
}

export const api = new Api({
    baseUrl: 'https://alyonag.students.nomoreparties.co/api',
    //baseUrl: 'http://localhost:4000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});