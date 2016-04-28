export default function(todoList, block) {
    var filteredList = todoList.filter(function(todo) {
        return todo.completed;
    });

    if (filteredList.length > 0) {
        return block.fn(this);
    }
};