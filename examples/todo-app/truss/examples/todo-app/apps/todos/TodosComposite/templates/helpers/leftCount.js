export default function(todoList) {
    var filteredList = todoList.filter(function(todo) {
        return !todo.completed;
    });

    return filteredList.length;    
}