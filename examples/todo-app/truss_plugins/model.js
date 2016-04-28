import RequestHelper from 'plugins/request';

function Model(config) {
    this.fetchApi = config.fetchApi;
    this.updateApi = config.updateApi;
    this.deleteApi = config.deleteApi;
    this.value = null;
}

Model.prototype = (function () {

    function fetch(params) {
        var self = this,
            url;

        if (params) {
            url = this.fetchApi + '?' + RequestHelper.getQueryStringForObject(params);
        } else {
            url = this.fetchApi;
        }

        return RequestHelper.getJSON(url).then(function (data) {
            this.value = data;
            return data;
        });
    }

    function update(payload) {
        return RequestHelper.postJSON(this.updateApi, payload);
    }

    function del(payload) {
        return RequestHelper.postJSON(this.updateApi, payload);
    }

    return {
        fetch: fetch,
        update: update,
        del: del
    };
})();

export default Model;
