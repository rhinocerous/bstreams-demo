(function () {
    "use strict";

    angular.module(APPNAME)
        .controller('editorialContentPreviewController', EditorialContentPreviewController);

    EditorialContentPreviewController.$inject = ['$scope', '$routeParams', '$baseController', '$editorialContentService', '$mediaService', 'editorialContentConfig', '$location', '$anchorScroll', '$editorialService', '$folderService', '$mediaService'];

    function EditorialContentPreviewController(
        $scope
        , $routeParams
        , $baseController
        , $editorialContentService
        , $mediaService
        , editorialContentConfig
        , $location
        , $anchorScroll
        , $editorialService
        , $folderService) {

        var vm = this;
        vm.$scope = $scope;
        vm.$routeParams = $routeParams;
        vm.$editorialContentService = $editorialContentService;
        vm.$editorialService = $editorialService;
        vm.$folderService = $folderService;
        vm.$mediaService = $mediaService;
        vm.editorialId = vm.$routeParams.editorialId;
        vm.constants = editorialContentConfig;
        vm.$location = $location;
        vm.$anchorScroll = $anchorScroll;
        $baseController.merge(vm, $baseController);

        vm.activeEditTab = 1;
        vm.activeLayoutTab = 1;
        vm.activeLinkTagTab = 1;
        vm.addRowCollapsed = true;
        vm.contentIds = [];
        vm.contentTemplatesCollapsed = true;
        vm.currentItemHasImage = false;
        vm.currentId = null;
        vm.currentItemContentDataIndex = null;
        vm.currentItemImgCount = null;
        vm.currentItem = null;
        vm.currentItemLinking = [];
        vm.currentItemType = null;
        vm.currentPid = 0;
        vm.dndListCols = [];
        vm.dndListImageBank = [];
        vm.editElement = false;
        vm.editing = false;
        vm.editLink = false;
        vm.editOrUpload = false;
        vm.editorialLinking = [];
        vm.elTemplates = vm.constants.templates;
        vm.itemIndex = null;
        vm.itemContentTypeId = null;
        vm.hideWysiwyg = false;
        vm.linkedMedia = [];
        vm.linkTagIsCollapsed = false;
        vm.myDropzone;
        vm.newRow = { columns: 0, columnData: [] }  
        vm.newRowRef = 0;                           
        vm.newCopyRow = null;
        vm.rowToDelete = null;
        vm.$scope.editorConfig = vm.constants.wysiwygConfig;
        vm.selectedRow = null;
        vm.shapeOptions = vm.constants.shapes;
        vm.showDeleteWarning = false;
        vm.tagLink = false;
        vm.uploadImg = false;

        //editor options                                                  
        vm.alignmentOptions = vm.constants.alignmentOptions;
        vm.borderOptions = vm.constants.borderOptions;
        vm.borderWidthOptions = [];
        vm.columnOptions = vm.constants.numberColumns;
        vm.columnWidthOptions = vm.constants.columnWidth;
        vm.dividerOptions = vm.constants.dividerOptions;
        vm.fontOptions = vm.constants.fontFamily;
        vm.marginTopOptions = [];
        vm.marginBottomOptions = [];
        vm.paddingTopOptions = [];
        vm.paddingBottomOptions = [];
        vm.paddingLeftOptions = [];
        vm.paddingRightOptions = [];
        vm.positionOptions = vm.constants.positionOptions;

        vm.addNewColumns = _addNewColumns;
        vm.addCopiedRow = _addCopiedRow;
        vm.addRow = _addRow;
        vm.backToEditorialLevel = _backToEditorialLevel;
        vm.cancelEdit = _cancelEdit;
        vm.delete = _delete;
        vm.deleteContentLink = _deleteContentLink;
        vm.deleteRow = _deleteRow;
        vm.dropCallback = _dropCallback;
        vm.findParentCol = _findParentCol;
        vm.getContentLinking = _getContentLinking;
        vm.getContentList = _getContentList;
        vm.getLinkedMedia = _getLinkedMedia;
        vm.getTotalColWidth = _getTotalColWidth;
        vm.insert = _insert;
        vm.insertLinking = _insertLinking;
        vm.showEdit = _showEdit;
        vm.hideEdit = _hideEdit;
        vm.launchEditor = _launchEditor;
        vm.launchTagLink = _launchTagLink;
        vm.launchUploader = _launchUploader;
        vm.removeImage = _removeImage;
        vm.setSelectedRow = _setSelectedRow;
        vm.submitMedia = _submitMedia;
        vm.updateSortOrder = _updateSortOrder;
        vm.updateContent = _updateContent;
        
        //on load get current content list for editorial & linked media
        vm.getContentList();

        //set up notifier so updates go to vm
        vm.notify = vm.$editorialContentService.getNotifier($scope);

        //helper function for dndList
        vm.$scope.$watch('vm.dndListCols', function (model) {
            console.log("vm.$scope.$watch firing...");
        });       

        function _addCopiedRow() {
            console.log("newCopyRow..." + JSON.stringify(vm.dndListCols[vm.newCopyRow]));
            //console.log("newCopyRow columns..." + vm.dndListCols[vm.newCopyRow].row.length);
            var rowIndex = vm.dndListCols.map(function (e) { return e.rowId }).indexOf(vm.newCopyRow);
            vm.newRow.columns = vm.dndListCols[rowIndex].row.length;
            for (var i = 0; i < vm.newRow.columns; i++) {
                var myData = {
                    sortOrder: 0,
                    pageContent: null,
                    contentTypeId: 11,
                    editorialId: vm.editorialId,
                    contentOptions: {
                        rowRef: vm.newRowRef,
                        columnId: i,
                        columnRef: i,
                        columnWidth: vm.dndListCols[rowIndex].row[i].colWidth
                    },
                    contentData: null,
                    title: null
                }
                vm.newRow.columnData.push(myData);
            }
            vm.addRow();
        }

        function _addNewColumns() {           
            vm.newRow.columnData = [];
            console.log("vm.newRowRef..." + vm.newRowRef)
            var colPresets = [];
            switch (vm.newRow.columns) {
                case 1:
                    colPresets.push(12);
                    break;
                case 2:
                    colPresets.push(6, 6);
                    break;
                case 3:
                    colPresets.push(4, 4, 4);
                    break;
                case 4:
                    colPresets.push(3, 3, 3, 3);
                    break;
                case 5:
                    colPresets.push(3, 3, 2, 2, 2);
                    break;
                case 6:
                    colPresets.push(2, 2, 2, 2, 2, 2);
                    break;
                case 7:
                    colPresets.push(2, 2, 2, 2, 2, 1, 1);
                    break;
                case 8:
                    colPresets.push(2, 2, 2, 2, 1, 1, 1, 1);
                    break;
            }
            for (var i = 0; i < vm.newRow.columns; i++){
                var myData = {
                    sortOrder: i,
                    pageContent: null,
                    contentTypeId: 11,
                    editorialId: vm.editorialId,
                    contentOptions: {
                        rowRef: vm.newRowRef,
                        columnId: i,
                        columnRef: i,
                        columnWidth: colPresets[i]
                    },
                    contentData: null,
                    title: null
                }
                console.log("myData..." + JSON.stringify(myData));
                vm.newRow.columnData.push(myData);                
            }
            //console.log("here's the data..." + JSON.stringify(vm.newRow.columnData));
        }


        function _addRow() {
            console.log("here's the data to loop through and insert..." + JSON.stringify(vm.newRow.columnData));
            vm.newRow.columnData.forEach(function (arrayItem) {
                var myData = {
                    sortOrder: arrayItem.sortOrder,
                    pageContent: arrayItem.pageContent,
                    contentTypeId: arrayItem.contentTypeId,
                    editorialId: arrayItem.editorialId,
                    contentOptions: arrayItem.contentOptions,
                    contentData: arrayItem.contentData,
                    title: arrayItem.title
                }   
                vm.$editorialContentService.insert(myData, insertSuccess, insertError);
            });
        }

        function _backToEditorialLevel() {
            vm.tagLink = false;
            vm.currentItemLinking = vm.editorialLinking;
            vm.currentItem = null;
            vm.editOrUpload = false;
            vm.editing = false;
        }

        function _cancelEdit() {
            vm.editing = false;
            vm.editOrUpload = false;
            vm.getContentList();
            vm.backToEditorialLevel();
        }

        function _delete(id) {
            vm.$editorialContentService.delete(id, deleteSuccess, deleteError);
        }

        function _deleteContentLink(editorialContentId, mediaId) {
            vm.$editorialContentService.deleteLinking(editorialContentId, mediaId, deleteContentLinkSuccess, deleteContentLinkError);
        }

        function deleteContentLinkError(response){
            console.log("oops! didn't delete content link..." + JSON.stringify(response));
        }

        function deleteContentLinkSuccess(data) {
            vm.getContentLinking(vm.currentItem.id);
        }

        function deleteError(response) {
            console.log(response);
        }

        function _deleteRow() {
            var itemsToDelete = new Object;
            var tempArray = [];
            var rowIndex = vm.dndListCols.map(function (e) { return e.rowId }).indexOf(vm.rowToDelete);
            vm.dndListCols[rowIndex].row.forEach(function (column) {
                tempArray.push(column.itemId);
                column.column.forEach(function (contentItem) {
                    tempArray.push(contentItem.id);
                });
            });
            itemsToDelete.ids = tempArray;
            //console.log("itemsToDelete: " + JSON.stringify(itemsToDelete));
            vm.$editorialContentService.deleteList(itemsToDelete, deleteRowSuccess, deleteRowError)
        }

        function deleteRowError(response) {
            console.log("something went wrong deleting the row")
        }

        function deleteRowSuccess(data) {
            vm.getContentList();
            vm.showDeleteWarning = false;
            vm.rowToDelete = null;
            vm.selectedRow = null;
        }

        function deleteSuccess(data) {
            console.log("delete success...")
            vm.updateSortOrder();
        }

        //cb function for dnd to get proper index of moved or inserted elements for updateSortOrder func
        function _dropCallback(event, index, item, type) {
            vm.itemIndex = index;
            vm.itemContentTypeId = item.contentTypeId;
            console.log("vm.itemIndex: " + vm.itemIndex);
            return item;
        }

        //find parent row and column of item & update/insert based on operation value provided
        function _findParentCol(item, operation) {
            item.contentOptions.columnRef = item.contentOptions.columnRef;
            item.contentOptions.rowRef = item.contentOptions.rowRef;
            var rowInd = null;
            //find row reference
            for (var rowIndex = 0; rowIndex < vm.dndListCols.length; rowIndex++) {
                vm.dndListCols[rowIndex].row.forEach(function (arrayItem) {
                    arrayItem.column.forEach(function (arrayItem) {
                        if (arrayItem.id === item.id) {
                            item.contentOptions.rowRef = vm.dndListCols[rowIndex].rowId;
                            rowInd = rowIndex;
                        }
                    });
                });
            }
            console.log("new row ref: " + item.contentOptions.rowRef);
            //find column reference
            for (var colIndex = 0; colIndex < vm.dndListCols[rowInd].row.length; colIndex++) {
                vm.dndListCols[rowInd].row[colIndex].column.forEach(function (arrayItem) {
                    if (arrayItem.id === item.id) {
                        console.log("colIndex: " + colIndex);
                        item.contentOptions.columnRef = colIndex;
                    }
                });
            }
            var myData = {
                sortOrder: vm.itemIndex,
                pageContent: item.pageContent,
                contentTypeId: item.contentTypeId,
                editorialId: vm.editorialId,
                contentOptions: item.contentOptions,
                contentData: item.contentData,
                title: null
            }
            //for moving items
            if (operation === 1) {
                console.log("updating column ref...here's my new columnRef: " + myData.contentOptions.columnRef + "...and my new rowRef: " + myData.contentOptions.rowRef);
                vm.$editorialContentService.update(myData, item.id, updateRefSuccess, updateError);
            //for inserting items
            } else if (operation === 2) {
                if (vm.itemIndex === 0 || item.contentOptions.rowRef === 0 && item.contentOptions.columnRef === 0) {
                    myData.sortOrder = vm.itemIndex > 0 ? vm.itemIndex * 10 + 1 : 0;
                } else {
                    var prevItemSortOrder = vm.dndListCols[rowInd].row[item.contentOptions.columnRef].column[(vm.itemIndex - 1)].sortOrder;
                    myData.sortOrder = prevItemSortOrder + 1
                }
                console.log("inserting data...here's what i'm sending..." + JSON.stringify(myData));
                vm.insert(myData, myData.sortOrder);
            } else {
                var rowCol = {
                    columnRef: item.contentOptions.colRef,
                    rowRef: item.contentOptions.rowRef
                }
                return rowCol;
            }
        }

        //generate px options in bulk                                                                         
        function generateOptions(custClassPrefix, init, max, increment, targetArray, measure) {     
            for (var i = init; i < max + increment; i += increment) {
                var measure = measure === undefined ? '' : measure;
                var opt = new Object;
                opt.label = i + " px";
                opt.custClass = custClassPrefix + i + measure;
                targetArray.push(opt);
            }
        };

        //generate editor width, padding, margin options                                   
        generateOptions('bord-', 1, 10, 1, vm.borderWidthOptions, 'px');
        generateOptions('', 10, 40, 5, vm.marginTopOptions);
        generateOptions('', 10, 40, 5, vm.marginBottomOptions);
        generateOptions('', 0, 40, 5, vm.paddingTopOptions);
        generateOptions('', 0, 40, 5, vm.paddingBottomOptions);
        generateOptions('', 0, 40, 5, vm.paddingLeftOptions);
        generateOptions('', 0, 40, 5, vm.paddingRightOptions);

        function _getContentLinking(id) {
            vm.$editorialContentService.getLinking(id, getContentLinkingSuccess, getContentLinkingError);
        }

        function getContentLinkingError(response) {
            console.log("something went wrong getting content linking..." + JSON.stringify(response));
        }

        function getContentLinkingSuccess(data) {
            vm.notify(function () {
                vm.currentItemLinking = data.items;
            });
        }

        function _getContentList(){
            vm.$editorialContentService.get(vm.editorialId, getSuccess, getError);
        }

        function _getEditorialLinking() {                   //**might not need this if getting editorial linking info in initial getContentList call...
            vm.$editorialService.getLinkingByEid(vm.editorialId, getEditorialLinkingSuccess, getEditorialLinkingError);
        }

        function getEditorialLinkingError(response) {       //**might not need this if getting editorial linking info in initial getContentList call...
            console.log("something went wrong getting editorial linking..." + JSON.stringify(response));
        }

        function getEditorialLinkingSuccess(data) {         //**might not need this if getting editorial linking info in initial getContentList call...
            vm.notify(function () {
                vm.editorialLinking = data.items;
                vm.currentItemLinking = data.items;
            });
        }

        function getError(response) {
            console.log(response);
        }

        function _getFolders() {
            vm.$folderService.selectAll(getFoldersSuccess, getFoldersError)
        }

        function getFoldersError(response) {
            console.log("error getting folders..." + JSON.stringify(response));
        }

        function getFoldersSuccess(data) {
            for (var i = 0; i < data.items.length; i++) {
                if (data.items[i].parentFolderId === 0) {
                    vm.dndListImageBank.push(data.items[i]);
                }
            }
        }

        function getItemType(item) {
            switch (item.contentTypeId) {
                case 1:
                    vm.currentItemType = "Text";
                    break;
                case 3:
                    vm.currentItemType = "Divider";
                    break;
                case 4:
                    vm.currentItemType = "Image";
                    break;
                case 7:
                    vm.currentItemType = "Image + Caption";
                    break;
                case 8:
                    vm.currentItemType = "Button";
                    break;
                case 9:
                    vm.currentItemType = "Video";
                    break;
                case 10:
                    vm.currentItemType = "Custom Html";
                    break;
                default:
                    vm.currentItemType = undefined;
            }
        }

        //get linked media
        function _getLinkedMedia(ids) {            
            var mediaIds = new Object;
            var tempArray = [];
            ids.forEach(function (arrayItem) {
                tempArray.push(arrayItem);
            });
            mediaIds.mediaIdList = tempArray;
            
            vm.$mediaService.getMultipleByIds(mediaIds, getLinkedMediaSuccess, getLinkedMediaError);
        }

        function getLinkedMediaError(response) {
            console.log("something went wrong getting media...")
        }

        function getLinkedMediaSuccess(data) {
            //console.log(JSON.stringify(data.items));    
            vm.notify(function () {
                vm.linkedMedia = data.items;
            });
        }

        //*****new version with column placeholders
        function getSuccess(data) {
            //get linked media
            vm.getLinkedMedia([1038, 1039, 1040, 1041]);
            if (data.items != null) {
                var dndTempList = [];                               
                var tempData = data.items;
                console.log("here's the data i got..." + JSON.stringify(tempData));
                var tempRowNum = [];                  
                //loop through tempData
                for (var i = 0; i < tempData.length; i++) {
                    //push ids to vm.contentIds array
                    vm.contentIds.push(tempData.id);
                    //add placeholder image if type has image and content data null
                    if (tempData[i].contentTypeId < 8 && 4 <= tempData[i].contentTypeId && tempData[i].contentData.length < 1) {
                        tempData[i].contentData.push({ mediaFullUrl: "http://placehold.it/250x200" })
                    }
                    //check for rowRef in contentOptions to get max and create
                    if (tempData[i].contentOptions == null || tempData[i].contentOptions === undefined) {
                        tempData[i].contentOptions = { rowRef: 0 };
                    } else if (tempData[i].contentOptions.rowRef == null || tempData[i].contentOptions.rowRef === undefined) {
                        tempData[i].contentOptions.rowRef = 0;                           
                    } else {
                        tempRowNum.push(tempData[i].contentOptions.rowRef);                            
                    }
                    if (tempData[i].contentOptions.columnRef === null || tempData[i].contentOptions.columnRef === undefined) {
                        tempData[i].contentOptions.columnRef = 0;
                    }                           
                }                                            
                var maxRows = tempRowNum.length > 0 ? Math.max.apply(Math, tempRowNum) : console.log("no row refs defined");
                console.log("maxRows: " + maxRows);
                //add rows to dndListCols array
                if (maxRows === 0) {
                    dndTempList.push({ rowId: 0, rowIndex: i, row: [] });
                } else if (maxRows > 0) {
                    for (var i = 0; i < maxRows + 1; i++) {
                        dndTempList.push({ rowId: i, rowIndex: i, row: [] });
                    }
                }
                //console.log("dndTempList after pushing rows: " + JSON.stringify(dndTempList));
                for (var rowIndex = 0; rowIndex < dndTempList.length; rowIndex++) {
                    var tempRowData = [];
                    //loop through data && check if rowRef = index of row in loop --> push columnRef to tempColNums array && push columnRef to tempColNums array
                    for (var dataIndex = 0; dataIndex < tempData.length; dataIndex++) {                                                         
                        if (tempData[dataIndex].contentOptions.rowRef == rowIndex) {
                            if (tempData[dataIndex].contentTypeId === 11) {
                                var item = tempData[dataIndex];

                                dndTempList[rowIndex].row.push({ itemId: item.id ,colId: item.contentOptions.columnId, colWidth: item.contentOptions.columnWidth ,column: [] })
                            } else {
                                tempRowData.push(tempData[dataIndex]);
                            }
                        }                              
                    }
                    //console.log("tempRowData: " + JSON.stringify(tempRowData));
                    tempRowData.forEach(function (rowDataItem) {
                        var itemColRef = rowDataItem.contentOptions.columnRef;
                        dndTempList[rowIndex].row[itemColRef].column.push(rowDataItem); 
                    });
                }

                //console.log("content data before splice..." + JSON.stringify(dndTempList))
                var noEmptyRows = [];
                var rowCount = 1;
                for (var i = 0; i < dndTempList.length; i++) {                    
                    if (dndTempList[i].row.length > 0) {
                        dndTempList[i].rowIndex = rowCount;
                        rowCount += 1;
                        noEmptyRows.push(dndTempList[i]);
                    }
                }               
                //console.log("here's the content data: " + JSON.stringify(noEmptyRows));
                vm.notify(function () {
                    vm.dndListCols = noEmptyRows;
                    vm.newRowRef = maxRows > 0 ? maxRows + 1 : 0;
                    vm.newRow = { columns: 0, columnData: [] };
                });
            }            
        }

        function _getTotalColWidth() {
            var total = 0;
            for (var i = 0; i < vm.newRow.columnData.length; i++) {
                    var width = vm.newRow.columnData[i].contentOptions.columnWidth;
                    total += width;
            }          
            return total;
        }


        function _insert(item, sort) {
            var myData = {
                sortOrder: sort === null ? vm.itemIndex : sort,
                pageContent: item.pageContent,
                contentTypeId: item.contentTypeId,
                editorialId: vm.editorialId,
                contentOptions: item.contentOptions,
                contentData: item.contentData,
                title: null
            }
            console.log("firing old insert function...");
            vm.$editorialContentService.insert(myData, insertSuccess, insertError);
        }

        function insertError(response) {
            console.log(response);
        }
        
        function _insertLinking(img) {
            if (vm.currentItem == null) {
                //insert editorial link
            } else {
                //insertEditorialContentLink
                var myData = {
                    editorialContentId: vm.currentItem.id,
                    mediaId: img.id,
                    link: null,
                    type: null
                }
                vm.$editorialContentService.insertLinking(myData)
            }
        }

        function insertMediaError(response) {
            console.log("there was an error inserting media");
        }
        function insertMediaSuccess(data) {
            console.log("media insert successful");
            vm.getContentList();
            vm.editOrUpload = false;
            vm.uploadImg = false;
        }

        function insertSuccess(data) {
            console.log("insert success..." + JSON.stringify(data.item));
            vm.updateSortOrder(data.item);
            vm.newRow = { columns: 0, columnData: [] }
            vm.newCopyRow = null;
            vm.selectedRow = null;
        }

        function _hideEdit() {
            vm.editElement = false;
        }

        function _launchEditor(item) {
            vm.currentItem = item;
            getItemType(item);
            vm.getContentLinking(item.id);
            vm.editing = true;
            vm.editOrUpload = true;
            vm.uploadImg = false;
            vm.activeEditTab = 1;
            vm.currentItemHasImage = false;
            vm.hideWysiwyg = false;
            switch (item.contentTypeId) {
                case 3:
                    vm.activeEditTab = 2;
                    vm.hideWysiwyg = true;
                    break;
                case 4:
                    vm.currentItemHasImage = true;
                    vm.hideWysiwyg = true;
                    vm.activeEditTab = 2;
                    break;
                case 7:
                    vm.currentItemHasImage = true;
                    break;
                case 10:
                    vm.hideWysiwyg = true;
                    break;
                default:
                    vm.currentItemType = undefined;
            }
        }

        function _launchTagLink(item) {
            vm.currentItem = item;
            getItemType(item);
            vm.tagLink = true;
            vm.getContentLinking(item.id);
        }

        function _launchUploader(item, index) {
            vm.uploadImg = true;
            vm.editing = false;
            vm.editOrUpload = true;
            getItemType(item);
            vm.currentItem = item;
            vm.currentItemImgCount = item.contentData.length;
            vm.currentItemContentDataIndex = index;
        }

        function _removeImage(index) {
            var contentDataIndex = index;
            vm.$editorialContentService.deleteMedia(vm.currentItem.contentData[contentDataIndex].mediaId, removeImageSuccess, removeImageError);
        }

        function removeImageError(response) {
            console.log("uh-oh, something went wrong deleting media :(")
        }

        function removeImageSuccess(data) {
            console.log("media deleted successfully");
            vm.editOrUpload = false;
            vm.editing = false;
            vm.getContentList();
        }

        function _setSelectedRow(operation) {
            operation === 'delete' ? vm.selectedRow = vm.rowToDelete : vm.selectedRow = vm.newCopyRow;
        }

        function _showEdit() {
            vm.editElement = true;
        }

        function _submitMedia() {
            console.log("inserting media. index: " + vm.currentItemContentDataIndex);
            vm.myDropzone.processQueue();
        }

        function _updateContent(item) {
            console.log(item);
            var myData = {
                sortOrder: item.sortOrder,
                pageContent: item.pageContent,
                contentTypeId: item.contentTypeId,
                editorialId: item.editorialId,
                contentOptions: item.contentOptions,
                contentData: item.contentData,
                title: item.title
            }
            console.log("here's the updated data: " + JSON.stringify(myData));
            vm.$editorialContentService.update(myData, item.id, updateSuccess, updateError);
        }

        function updateError(response) {
            console.log(response);
        }

        function updateMediaSuccess(data) {
            console.log("media updated successfully");
            vm.getContentList();
            vm.editOrUpload = false;
            vm.uploadImg = false;
        }

        function updateMediaError(response) {
            console.log("something went wrong updating media")
        }

        function updateRefSuccess(data) {
            vm.updateSortOrder();
        }

        function updateSuccess(data) {
            vm.editing = false;
            vm.editOrUpload = false;
            vm.currentItem = null;
            vm.currentItemType = null;
            vm.getContentList();
            vm.backToEditorialLevel();
        }

        function _updateSortOrder() {
            var newSortOrder = new Object;
            var tempArray = []
            vm.dndListCols.forEach(function (arrayItem) {                                                           
                arrayItem.row.forEach(function (arrayItem) {
                    arrayItem.column.forEach(function (arrayItem) {
                        tempArray.push(arrayItem.id);
                    });                    
                });
            });
            newSortOrder.ids = tempArray;
            console.log("here's the array I'm sending..." + newSortOrder.ids);
            tempArray.length > 1 ? vm.$editorialContentService.updateSortOrder(newSortOrder, updateSortOrderSuccess, updateSortOrderError) : vm.getContentList();
        }

        function updateSortOrderError(response) {
            console.log(response);
        }

        function updateSortOrderSuccess(data) {
            console.log("update success, getting refreshed data")
            vm.getContentList();
        }

        //dropzone config
        vm.myDropzone = {
            'options': {
                // passed into the Dropzone constructor *keep parent id 0 for now **eventually will be vm.editorialId
                'url': '/api/media/create/1/0',
                'autoProcessQueue': false,
                'parallelUploads': 1,
                'maxFiles': 1
            },
            'eventHandlers': {
                'addedfile': function () {
                    var dzMessageElement = angular.element('.dz-message');
                    dzMessageElement.hide();
                    console.log("file added to list...")
                },
                'sending': function (file, xhr, formData) {
                    console.log("sending...")
                },
                'success': function (file, response) {
                    console.log(response);
                    vm.mediaId = response.item;

                    //insert row into mapping table 
                    var myData = {
                        mediaId: vm.mediaId,
                        editorialContentId: vm.currentItem.id,
                        editorialContentIdIndex: vm.currentItemContentDataIndex
                    }
                    //insert media into mapping table
                    if (vm.currentItem.contentTypeId != 5 && vm.currentItem.contentData[0].mediaId) {
                        //update media if contentData set to actual image, not placeholder
                        console.log("update media mode");
                        vm.$editorialContentService.updateMedia(vm.currentItem.id, myData, updateMediaSuccess, updateMediaError);
                    } else {
                        vm.$editorialContentService.insertMedia(myData, insertMediaSuccess, insertMediaError);
                        console.log("insert media mode");
                    }

                    vm.myDropzone.removeAllFiles();

                    var dzMessageElement = angular.element('.dz-message');
                    dzMessageElement.show();
                },
                'error': function (file, errorMessage) {
                    console.log("Something went wrong. Please refresh and try again.", errorMessage);
                },
                'maxfilesexceeded': function (file, response) {
                    console.log("Limit 1 media file.", response);
                }
            }
        }  
    }
})();
//--end editorial content controller
