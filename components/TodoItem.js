import React from 'react';
import { View, Text, CheckBox, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';


const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    height: 60,
    width: '100%',           
    maxWidth: 500,           
    marginLeft: 'auto', 
    marginRight: 'auto',
  },
  text: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    marginLeft: 8,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  button: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
  moveButton: {
    backgroundColor: '#4CAF50',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
  },
  restoreButton: {
    backgroundColor: '#FF7F50',
  },
  editButton: {
    backgroundColor: '#2671eb',
  },
});

export default function TodoItem({
  task,
  deleteTask,
  toggleCompleted,
  startEditTask,
  moveUp,
  moveDown,
  pinTask,
  unpinTask,
  showUnpinButton,
  restoreTask,
  showRestoreButton,
  hideMoveButtons,
}) {
  return (
    <View style={styles.todoItem}>
      <CheckBox value={task.completed} onValueChange={() => toggleCompleted(task.id)} />
      <Text style={[styles.text, task.completed && styles.completedText]}>
        {task.text}
      </Text>

      {!task.completed && !showRestoreButton && !hideMoveButtons && (
        <>
          <TouchableOpacity style={[styles.button, styles.moveButton]} onPress={() => moveUp(task.id)}>
            <Text style={styles.buttonText}>↑</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.moveButton]} onPress={() => moveDown(task.id)}>
            <Text style={styles.buttonText}>↓</Text>
          </TouchableOpacity>
        </>
      )}

      {showUnpinButton ? (
        <TouchableOpacity onPress={() => unpinTask(task.id)}>
          <MaterialIcons
            name="push-pin"
            size={24}
            color="red"
            style={{ transform: [{ rotate: '45deg' }] }}
          />
        </TouchableOpacity>
      ) : !task.completed && !showRestoreButton && (
        <TouchableOpacity onPress={() => pinTask(task.id)}>
          <MaterialIcons name="push-pin" size={24} marginLeft={20} color="black" />
        </TouchableOpacity>
      )}

      {showRestoreButton && (
        <TouchableOpacity style={[styles.button, styles.restoreButton]} onPress={restoreTask}>
          <Text style={styles.buttonText}>Restore</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={() => deleteTask(task.id)}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>

      {!task.completed && !showRestoreButton && (
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() => startEditTask(task.id)}>
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

