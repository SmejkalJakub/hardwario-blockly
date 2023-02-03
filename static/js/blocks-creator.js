
window.addEventListener('load', load_saved_blocks);
window.addEventListener('load', load_pre_made_blocks);

function load_saved_blocks() {
    // Load list of saved blocks
    var list = document.getElementById("list-user-blocks");
    list.innerHTML = "";
    for (var i = 0; i < user_blocks_list.length; i++) {
        // List item with delete button in another column on the same line
        var li = document.createElement("div");
        li.setAttribute("class", "row");

        var col = document.createElement("div");
        col.setAttribute("class", "col-sm-10");

        var li_name = document.createElement("a");
        li_name.appendChild(document.createTextNode(user_blocks_list[i]));
        li_name.setAttribute("onclick", "select_user_block('" + user_blocks_list[i] + "')");
        li_name.setAttribute("class", "list-group-item list-group-item-action col-10");
        col.appendChild(li_name);
        li.appendChild(col);

        var col2 = document.createElement("div");
        col2.setAttribute("class", "col-sm-2");

        var li_delete = document.createElement("button");
        li_delete.appendChild(document.createTextNode("Delete"));
        li_delete.setAttribute("onclick", "delete_user_block('" + user_blocks_list[i] + "')");
        li_delete.setAttribute("class", "btn btn-danger col-2");
        col2.appendChild(li_delete);
        li.appendChild(col2);

        list.appendChild(li);
    }
}

function delete_user_block(name) {
    if (confirm("Are you sure you want to delete the block '" + name + "'?")) {
        // Send request to delete the block with ajax
        $.ajax({
            url: "/delete_user_block",
            type: "GET",
            data: { name: name },
            success: function (data) {
              // Reload the list of projects
              window.location.href = "/blocks_creator";
            }
          });
    }
}

function load_pre_made_blocks() {
    var list = document.getElementById("list-pre-made-blocks");
    list.innerHTML = "";
    for (var i = 0; i < pre_made_blocks_list.length; i++) {
        var li = document.createElement("a");
        li.appendChild(document.createTextNode(pre_made_blocks_list[i]));
        li.setAttribute("onclick", "select_pre_made_block('" + pre_made_blocks_list[i] + "')");
        li.setAttribute("class", "list-group-item list-group-item-action");
        list.appendChild(li);
    }
}

function select_pre_made_block(name) {
    window.location.href = "/yaml_editor?pre_made_block=" + name;
}

function select_user_block(name) {
    window.location.href = "/yaml_editor?user_block=" + name;
}

function new_block() {
    // Ask user for name of the block
    var name = prompt("Please enter the name of the block", "My block");
    if (name == null || name == "") {
        alert("Name of the block cannot be empty");
    }
    else {
        // Check if the block already exists
        if (user_blocks_list.includes(name)) {
            alert("Block already exists");
        }
        else {
            // Create the block
            window.location.href = "/yaml_editor?user_block=" + name;
        }
    }
}
