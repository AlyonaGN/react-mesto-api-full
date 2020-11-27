import { getToken } from "./token";

class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getUserData() {
        this.makeApiRequest(`${this.baseUrl}/users/me`, {
            headers: this.headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    createCard(serverCard) {
        return {
          src: serverCard.link,
          alt: serverCard.name,
          description: serverCard.name,
          likes: serverCard.likes,
          likesAmount: serverCard.likes.length,
          id: serverCard._id,
          ownerId: serverCard.owner._id,
        }
      }

    getInitialCards() {
        this.makeApiRequest(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    editProfile(formValues) {
        this.makeApiRequest(`${this.baseUrl}/users/me`, {
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
        this.makeApiRequest(`${this.baseUrl}/cards`, {
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
        this.makeApiRequest(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            this.makeApiRequest(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this.headers
            })
                .then(res => {
                    return this._getResponseData(res);
                });
        }
        else {
            this.makeApiRequest(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this.headers
            })
                .then(res => {
                    return this._getResponseData(res);
                });
        }
    }

    changeAvatar(avatarLink) {
        this.makeApiRequest(`${this.baseUrl}/users/me/avatar`, {
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

        return Promise.reject(new Error(`Ошибка: ${res.status}`));
    }

    loadAppInfo() {
        return Promise.all([this.getInitialCards(), this.getUserData()]);
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