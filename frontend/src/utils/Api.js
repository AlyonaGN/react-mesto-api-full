class Api {
    constructor({ baseUrl, headers }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
    }

    getUserData() {
        return fetch(`${this.baseUrl}/users/me`, {
            headers: this.headers,
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
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers,
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    editProfile(formValues) {
        return fetch(`${this.baseUrl}/users/me`, {
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
        return fetch(`${this.baseUrl}/cards`, {
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
        return fetch(`${this.baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(res => {
                return this._getResponseData(res);
            });
    }

    changeLikeCardStatus(cardId, isLiked) {
        if (!isLiked) {
            return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'PUT',
                headers: this.headers,
            })
                .then(res => {
                    return this._getResponseData(res);
                });
        }
        else {
            return fetch(`${this.baseUrl}/cards/likes/${cardId}`, {
                method: 'DELETE',
                headers: this.headers,
            })
                .then(res => {
                    return this._getResponseData(res);
                });
        }
    }

    changeAvatar(avatarLink) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: avatarLink,
            })
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

}

export const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-14',
    headers: {
        authorization: '281eea5d-a9b0-4240-a494-1ec91d19957f',
        'Content-Type': 'application/json'
    }
});