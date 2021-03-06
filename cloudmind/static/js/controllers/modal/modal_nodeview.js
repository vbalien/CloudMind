app.controller('Modal_NodeView', ['$scope', '$modalInstance', 'NodeStore', 'UserStore',
    function ($scope, $modalInstance, NodeStore, UserStore) {

        var isClear;

        init_NodeViewModal();

        $scope.cancel = function () {
            $modalInstance.close();
        };

        /* Node */
        $scope.applyInModal = function () {

            var node = $scope.modalNode;
            var dueDate = new Date(node.due_date);

            console.log(node.due_date);

            NodeStore.updateNode(node.node_idx, node.name, dueDate.toJSON(),
                $scope.newDes, node.assigned_users, function (_node_idx, _node_list) {
                    $scope.modalNode.description = $scope.newDes;

                    if ($scope.modal_callback.updateNode)
                        $scope.modal_callback.updateNode(_node_idx, _node_list);

                    $modalInstance.close({
                        name: $scope.name,
                        groupType: $scope.groupType
                    });
                });
        };

        $scope.addNodeInModal = function (_nodename) {

            if (!_nodename) return;

            NodeStore.addNode(_nodename, $scope.modalNode.node_idx,
                $scope.modalNode.root_idx, function (_node, _node_list) {

                    if ($scope.modal_callback.addNode) $scope.modal_callback.addNode(_node, _node_list);

                    $scope.modalIdx = _node_list.length - 1;
                    $scope.clickChildNodeInModal(_node);
                });
        };

        $scope.clickChildNodeInModal = function (_node) {
            $scope.modalNode = JSON.parse(JSON.stringify(_node));
            init_NodeViewModal();
        };

        $scope.filterChildNode = function (_node) {

            if (_node.parent_idx == $scope.modalNode.node_idx) return true;
            else return false;
        };

        $scope.filterChildLeaf = function (_leaf) {
            if(_leaf.parent_idx == $scope.modalNode.node_idx) return true;
            else return false;
        };

        /* label */
        $scope.addLabelInModal = function (_idx) {
            var node = $scope.modalNode;
            var labels = JSON.parse(JSON.stringify(node.labels));

            labels.push(_idx);
            labels.sort();

            NodeStore.addLabel(node.node_idx, _idx,
                function (_node_id, _node_list, _palette_id) {
                    $scope.modalNode.labels = labels;

                    if ($scope.modal_callback.addLabel)
                        $scope.modal_callback.addLabel(_node_id, _node_list, _palette_id);
                });
        };

        $scope.removeLabelInModal = function (_idx) {
            NodeStore.removeLabel($scope.modalNode.node_idx, _idx,
                function (_node_id, _node_list, _palette_id) {

                    var idx = $scope.modalNode.labels.indexOf(_palette_id);
                    $scope.modalNode.labels.splice(idx, 1);
                    if ($scope.modal_callback.removeLabel) {
                        $scope.modal_callback.removeLabel(_node_id, _node_list, _palette_id);
                    }
                });
        };

        $scope.hasLabel = function (_idx) {

            var labelIdx = $scope.modalNode.labels.indexOf(_idx);

            if (labelIdx == -1) {
                $scope.addLabelInModal(_idx);
            }
            else  $scope.removeLabelInModal(_idx);
        };

        $scope.checkLabel = function(_idx){
            var labelIdx = $scope.modalNode.labels.indexOf(_idx);

            if (labelIdx == -1) return false;
            else return true;
        };

        /* Participant */
        $scope.filterParticipant = function(_user_idx){

            var users = $scope.modalNode.assigned_users;

            if(users.indexOf(_user_idx) ==  -1) return false;
            else return true;
        };

        $scope.participatedInNode = function(_user_idx){

            var users = $scope.modalNode.assigned_users;
            if(users.indexOf(_user_idx) == -1)
                $scope.addParticipantInModal(_user_idx);
            else $scope.removeParticipantInModal(_user_idx);

        };

        $scope.addParticipantInModal = function (_user_idx) {

            var node           = $scope.modalNode;
            var dueDate        = new Date(node.due_date);
            var assigned_users = JSON.parse(JSON.stringify(node.assigned_users));

            assigned_users.push(_user_idx);

            NodeStore.updateNode(node.node_idx, node.name, dueDate.toJSON(),
                $scope.newDes, assigned_users, function (_node_idx, _node_list) {

                    node.assigned_users.push(_user_idx);
                    node.assigned_users.sort();

                    if ($scope.modal_callback.updateNode)
                        $scope.modal_callback.updateNode(_node_idx, _node_list);
                }
            );
        };

        $scope.removeParticipantInModal = function (_user_idx) {

            var node           = $scope.modalNode;
            var dueDate        = new Date(node.due_date);
            var assigned_users = JSON.parse(JSON.stringify(node.assigned_users));
            var ParticipantIdx = assigned_users.indexOf(_user_idx);

            assigned_users.splice(ParticipantIdx, 1);

            console.log(assigned_users);

            NodeStore.updateNode(node.node_idx, node.name, dueDate.toJSON(),
                $scope.newDes,assigned_users, function (_node_idx, _node_list) {

                    node.assigned_users.splice(ParticipantIdx, 1);

                    if ($scope.modal_callback.updateNode)
                        $scope.modal_callback.updateNode(_node_idx, _node_list);
                }
            );
        };

        $scope.inviteUserInModal = function (_user) {
            if(!_user.description) return;
            UserStore.inviteUserToRoot($scope.modalNode.root_idx, _user.description);
        };

        /* Override User Search Func */
        $scope.clearInput = function () {
            $scope.$broadcast('angucomplete-alt:clearInput');
        };

        $scope.inputChanged = function(_str) {

            var len = _str.length;

            if(len == 0) isClear = true;
            else if(len == 1 && isClear == true) {

                isClear = false;
                UserStore.searchProfile(_str, function(_result) {
                    $scope.matchUserList = _result;
                });
            }
        };

        /* label palette */
        $scope.updateLabelPalette = function (_palette, _newPaletteName) {

            NodeStore.updateLabelPalette(_palette.palette_idx, _newPaletteName, _palette.color,
                function (_palette) {
                    $scope.cancelEditPaletteMode(_palette.palette_idx);

                    $scope.labelPalette[_palette.palette_idx].name = _palette.name;

                    if ($scope.modal_callback.updatePalette)
                        $scope.modal_callback.updatePalette(_palette);
                });
        };

        $scope.editPaletteMode = function (_idx) {
            $scope.editPalette[_idx] = true;
            $scope.newPaletteName = $scope.labelPalette[_idx].name;
        };

        $scope.cancelEditPaletteMode = function (_idx) {
            $scope.editPalette[_idx] = false;
        };

        $scope.addLeafInModal = function () {
            NodeStore.addLeaf($scope.newLeaf, $scope.modalNode.node_idx, function (_node_idx, _leaf, _node_list) {

                document.getElementById('leafName').value = null;
                $scope.modalNode.leafs.push(_leaf);
                if ($scope.modal_callback.addLeaf)
                    $scope.modal_callback.addLeaf(_node_idx, _leaf, _node_list);
            });
        };

        $scope.removeLeafInModal = function (_idx) {

        };

        $scope.downloadLeafInModal = function (_idx) {
            var URL = "/api/v1/leaf/" + _idx;
            window.open(URL, '_blank');
            return URL + _idx;
        };

        function init_NodeViewModal() {

            $scope.nodes        = NodeStore.getNodeList();
            $scope.users        = UserStore.syncUserList();
            $scope.labelPalette = NodeStore.getLabelPalette();

            $scope.editPalette  = new Object();
            $scope.newDes       = $scope.modalNode.description;
            $scope.newLeaf      = null;
            $scope.isEditmode   = false;
            $scope.isRoot       = ($scope.modalNode.node_idx == $scope.modalNode.root_idx) ? true : false;
            isClear             = true;

            $scope.modalNode.due_date = $scope.modalNode.due_date.substring(0, 10);
            $scope.modalNode.assigned_users.sort();

            console.log($scope.modalNode.assigned_users);
            for (var p in $scope.labelPalette) {
                $scope.editPalette[p] = false;
            }
        }
    }]);

app.controller('DatepickekCtrl', ['$scope', function ($scope) {

    $scope.$watch('dt', function () {
            var year = $scope.dt.getFullYear();
            var month = $scope.dt.getMonth() + 1;
            var date = $scope.dt.getDate();

            if(month.toString().length == 1) month = '0' + month;
            if(date.toString().length == 1)  date  = '0' + date;

            $scope.modalNode.due_date = (year + '-' + month + '-' + date);
        }
    );

    $scope.setDate = function (_date) {
        var date = _date.split('-');
        $scope.dt = new Date(date[0], date[1] - 1, date[2]);
    };

    $scope.open = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = !$scope.opened;
    };

    initDatePicker();

    function initDatePicker() {
        $scope.setDate($scope.modalNode.due_date);
    }

    $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1,
        class: 'datepicker'
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[1];
}]);

