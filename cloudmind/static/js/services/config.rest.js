app.service('HttpSvc', ['$http', function ($http) { /* resource api 수정해야함 */

        var urlBase = '/api/v1';

        return {
            /* PROFILE REST API */
            getProfile: function () {
                return $http({
                    url: urlBase + '/profile',
                    method: "GET"
                });
            },

            updateName: function (_name) {
                return $http({
                    url: urlBase + '/profile',
                    method: "POST",
                    data: {name: _name}
                });
            },

            searchProfile: function (_email, _name) {
                return $http({
                    url: urlBase + '/profile/search',
                    method: "GET",
                    params: {
                        email: _email,
                        name: _name
                    }
                });
            },

            /* ROOT REST API*/
            getRoots: function () {
                return $http({
                    url: urlBase + '/root/list',
                    method: "GET"
                });
            },

            inviteRoot: function (_root_idx, _email) {
                return $http({
                    url: urlBase + '/root/invite',
                    method: "POST",
                    data: {
                        root_idx: _root_idx,
                        email: _email
                    }
                });
            },

            /* NODE REST API */
            getNodes: function (_root_idx) {
                return $http({
                    url: urlBase + '/node/list',
                    method: "GET",
                    params: {root_idx: _root_idx}
                });
            },

            addNode: function (_node_name, _node_parent_idx, _root_idx) {
                return $http({
                    url: urlBase + '/node/add',
                    method: "POST",
                    data: {
                        node_name: _node_name,
                        parent_node_idx: _node_parent_idx,
                        root_idx: _root_idx
                    }
                });
            },

            removeNode: function (_node_idx) {
                return $http({
                    url: urlBase + '/node/remove',
                    method: "POST",
                    data: {node_idx: _node_idx}
                });
            },

            updateNode: function (_node_idx, _node_name, _dueDate, _description, _assigned_users) {
                return $http({
                    url: urlBase + '/node/update',
                    method: "POST",
                    data: {
                        node_idx       : _node_idx,
                        node_name      : _node_name,
                        description    : _description,
                        due_date       : _dueDate,
                        assigned_users : _assigned_users
                    }
                });
            },

            /* LABEL PALETTE REST API */

            getLabelpalettes: function (_root_idx) {
                return $http({
                    url: urlBase + '/label_palette/list',
                    method: "GET",
                    params: {root_idx: _root_idx}
                });
            },

            updateLabelpalette: function (_palette_idx, _name, _color) {
                return $http({
                    url: urlBase + '/label_palette/update',
                    method: "POST",
                    data: {
                        palette_idx: _palette_idx,
                        name: _name,
                        color: _color
                    }
                });
            },

            /* LABEL REST API */
            addLabel: function (_node_idx, _palette_idx) {
                return $http({
                    url: urlBase + '/label/add',
                    method: "POST",
                    data: {
                        node_idx: _node_idx,
                        palette_idx: _palette_idx
                    }
                });
            },

            removeLabel: function (_node_idx, _palette_idx) {
                return $http({
                    url: urlBase + '/label/remove',
                    method: "POST",
                    data: {
                        node_idx: _node_idx,
                        palette_idx: _palette_idx
                    }
                });
            },

            /* Leaf REST API */

            getLeafs :  function (_root_idx) {
                return $http({
                    url: urlBase + '/leaf/list',
                    method: "GET",
                    params: {root_idx: _root_idx}
                });
            },

            uploadLeaf: function (_file, _node_idx) {
                var fd = new FormData();
                fd.append('userfile' , _file);
                fd.append('node_parent_idx' , _node_idx);

                return $http.post(urlBase + '/leaf/upload', fd, {
                    headers: {'Content-Type': undefined}
                })
            },

            removeLeaf: function (_node_idx, _palette_idx) {
                return $http({
                    url: urlBase + '/label/remove',
                    method: "POST",
                    data: {
                        node_idx: _node_idx,
                        palette_idx: _palette_idx
                    }
                });
            }
        }
    }]

);
