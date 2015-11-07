app.controller('FullcalendarCtrl', ['$scope', 'NodeStore', function ($scope, NodeStore) {

    var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

    $scope.className = 'b-1 b-2x b-info'

    /* Node rest API test code*/
    /*(initCaleandar();

     function initCaleandar(){

     $scope.addRootCallback = function (_node) {
     console.log('calendar callback : ' + _node);
     };

     NodeStore.registerNodeStoreCallback($scope.addRootCallback);
     }*/

    /* event source that contains custom events on the scope */
    /* 칼럼 형식 : idx, title, start, info */
    /* 노드의 Description = info 를 사용*/
    $scope.event = [
        {node_idx:1, parent_idx:1, root_idx:1, name:"node1", desc:"asdfasdfasdf", assigned_users:[1001, 1002, 1003], labels:[0,1], due_date:"2015-11-19"},
        {node_idx:2, parent_idx:1, root_idx:1, name:"node2", desc:"zxcv", assigned_users:[1001, 1002, 1003], labels:[1,2], due_date:"2015-11-19"},
        {node_idx:3, parent_idx:2, root_idx:1, name:"node3", desc:"afawefeff", assigned_users:[1001, 1002, 1003], labels:[0,2,1], due_date:"2015-11-19"},
        {node_idx:4, parent_idx:1, root_idx:1, name:"node4", desc:"AWEFAWVSZDF", assigned_users:[1001, 1002, 1003], labels:[5,6,3], due_date:"2015-11-19"},
        {node_idx:5, parent_idx:4, root_idx:1, name:"node5", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[4,7,5], due_date:"2015-11-19"},
        {node_idx:6, parent_idx:1, root_idx:1, name:"node6", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[3,2,1], due_date:"2015-11-19"},
        {node_idx:7, parent_idx:1, root_idx:1, name:"node7", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[1,4,6,3], due_date:"2015-11-19"},
        {node_idx:8, parent_idx:1, root_idx:1, name:"node8", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[0,6], due_date:"2015-11-19"},

        {node_idx:11, parent_idx:4, root_idx:1, name:"node11", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[0,7], due_date:"2015-11-19"},
        {node_idx:12, parent_idx:4, root_idx:1, name:"node12", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[6,7,1], due_date:"2015-11-19"},
        {node_idx:13, parent_idx:4, root_idx:1, name:"node13", desc:"45345", assigned_users:[1001, 1002, 1003], labels:[2,3,0], due_date:"2015-11-19"},

        {node_idx:14, parent_idx:7, root_idx:1, name:"node14", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[5,1,3], due_date:"2015-11-19"},
        {node_idx:15, parent_idx:7, root_idx:1, name:"node15", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[0,7], due_date:"2015-11-19"},
        {node_idx:16, parent_idx:7, root_idx:1, name:"node16", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[2,3,1], due_date:"2015-11-19"},

        {node_idx:17, parent_idx:16, root_idx:1, name:"node17", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[0,7,6], due_date:"2015-11-19"},

        {node_idx:20, parent_idx:6, root_idx:1, name:"node20", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[0,7], due_date:"2015-11-19"},
        {node_idx:21, parent_idx:6, root_idx:1, name:"node21", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[0,7], due_date:"2015-11-19"},
        {node_idx:22, parent_idx:6, root_idx:1, name:"node22", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[0,7], due_date:"2015-11-19"},

        {node_idx:24, parent_idx:8, root_idx:1, name:"node24", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[0,7], due_date:"2015-11-19"},

        {node_idx:30, parent_idx:24, root_idx:1, name:"node30", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[0,7], due_date:"2015-11-19"},
        {node_idx:31, parent_idx:24, root_idx:1, name:"node31", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[0,7], due_date:"2015-11-19"},
        {node_idx:32, parent_idx:24, root_idx:1, name:"node32", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[0,7], due_date:"2015-11-19"},
        {node_idx:33, parent_idx:24, root_idx:1, name:"node33", desc:"FAWEFAWEFAWG", assigned_users:[1001, 1002, 1003], labels:[0,7], due_date:"2015-11-19"},
    ];

    /* alert on dayClick */
    $scope.precision = 400;
    $scope.lastClickTime = 0;
    $scope.alertOnEventClick = function (date, jsEvent, view) {
        var count = 0;
        for (var k in $scope.events) {
            ++count;
        }

        var time = new Date().getTime();
        if (time - $scope.lastClickTime <= $scope.precision) {
            $scope.events.push({
                idx: count,
                title: 'New Event',
                start: date,
                className: ['b-l b-2x b-info']
            });
        }
        $scope.lastClickTime = time;

    };

    /* alert on Resize */
    $scope.alertOnResize = function (event, delta, revertFunc, jsEvent, ui, view) {
        $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
    };

    $scope.overlay = $('.fc-overlay');
    $scope.alertOnMouseOver = function (event, jsEvent, view) {

        $scope.event = event;
        $scope.overlay.removeClass('left right top').find('.arrow').removeClass('left right top pull-up');
        var wrap = $(jsEvent.target).closest('.fc-event');
        var cal = wrap.closest('.calendar');
        var left = wrap.offset().left - cal.offset().left;
        var right = cal.width() - (wrap.offset().left - cal.offset().left + wrap.width());
        var top = cal.height() - (wrap.offset().top - cal.offset().top + wrap.height());
        if (right > $scope.overlay.width()) {
            $scope.overlay.addClass('left').find('.arrow').addClass('left pull-up')
        } else if (left > $scope.overlay.width()) {
            $scope.overlay.addClass('right').find('.arrow').addClass('right pull-up');
        } else {
            $scope.overlay.find('.arrow').addClass('top');
        }
        if (top < $scope.overlay.height()) {
            $scope.overlay.addClass('top').find('.arrow').removeClass('pull-up').addClass('pull-down')
        }
        (wrap.find('.fc-overlay').length == 0) && wrap.append($scope.overlay);
    };
    $scope.updateDuedate = function (event, delta, revertFunc, jsEvent, ui, view) {
        var event_idx = event.node_idx; // 노드의 idx
        var event_start = event.start.format(); // 드롭시 변경 될 날짜

        console.log('test');
        console.log(event_idx + '   ' + event_start);

        // POST Request (노드의 날짜 변경 api 호출 부분) 이 필요


        // alert(event.title + " was dropped on " + event.start.format());
        // if (!confirm("Are you sure about this change?")) {
        //   revertFunc(); // 변경사항을 취소하는 함수
        // }
    };

    /* config object */
    $scope.uiConfig = {
        calendar: {
            height: 450,
            editable: true,
            header: {
                left: 'prev',
                center: 'title',
                right: 'next'
            },
            dayClick: $scope.alertOnEventClick,
            eventDrop: $scope.updateDuedate,
            eventResize: $scope.alertOnResize,
            eventMouseover: $scope.alertOnMouseOver,

            eventRender: function (event, element, view) {
                element.append("<span class='closeon fa fa-trash' style='position: absolute; right : 6px; margin-top : -13px'></span>");
                element.find(".closeon").click(function () {
                    var _node_idx = event.node_idx;

                    NodeStore.removeNode(_node_idx, function(){
                        $('.calendar').fullCalendar('removeEvents',_node_idx);
                     });
                });
            }
        }
    };


    /* add custom event*/
    $scope.addEvent = function () {
        // 노드를 추가하는 화면 호출을 구현해야 함
        var count = 0;
        for (var k in $scope.events) {
            ++count;
        }

        $scope.events.push({
            idx: count,
            title: 'New Event',
            start: new Date(y, m, d),
            className: ['b-l b-2x b-info'], location: 'New York',
            // info:'This a all day event that will start from 9:00 am to 9:00 pm, have fun!'
        });

        console.log('asd');
    };



    /* Change View */
    $scope.today = function (calendar) {
        $('.calendar').fullCalendar('today');
    };

    /* event sources array*/
    $scope.eventSources = [$scope.events];
}]);
/* EOF */
