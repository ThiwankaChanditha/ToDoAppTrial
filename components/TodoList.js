import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import TodoItem from './TodoItem';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    width: '100%',
    maxWidth: 500,
    height: 60,  
    marginBottom: 20,
    alignItems: 'center',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 10,
    width: '100%',
    maxWidth: 500,
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    color: '#333',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionTitle: {
    textAlign: 'center',
    color: '#A52345',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  toggleButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
    width: '45%',
    alignItems: 'center',
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    width: '100%',
    maxWidth: 500,
  },
  emptyMessage: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
});

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editTaskId, setEditTaskId] = useState(null);
  const [viewPinned, setViewPinned] = useState(false);
  const [viewCompleted, setViewCompleted] = useState(false);

  function addTask() {
    if (isEditing) {
      setTasks(tasks.map(task => (task.id === editTaskId ? { ...task, text } : task)));
      setIsEditing(false);
      setEditTaskId(null);
    } else {
      const newTask = { id: Date.now(), text, completed: false, pinned: false };
      if (text.trim() !== "") {
        setTasks([...tasks, newTask]);
      }
    }
    setText('');
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  }

  function startEditTask(id) {
    const taskToEdit = tasks.find(task => task.id === id);
    setText(taskToEdit.text);
    setIsEditing(true);
    setEditTaskId(id);
  }

  function moveUp(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index > 0) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function moveDown(id) {
    const index = tasks.findIndex(task => task.id === id);
    if (index < tasks.length - 1) {
      const updatedTasks = [...tasks];
      [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
      setTasks(updatedTasks);
    }
  }

  function pinTask(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, pinned: true } : task
    ));
  }

  function unpinTask(id) {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, pinned: false } : task
    ));
  }

  function restoreTask(id) {
    toggleCompleted(id);
  }

  function toggleView() {
    setViewPinned(!viewPinned);
  }

  function toggleViewCompleted() {
    setViewCompleted(!viewCompleted);
  }

  const pinnedTasks = tasks.filter(task => task.pinned);
  const completedTasks = tasks.filter(task => task.completed);
  const activeTasks = tasks.filter(task => !task.completed && !task.pinned);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To do List</Text>

      <View style={styles.contentContainer}>
        {!viewPinned && !viewCompleted ? (
          <>
            <FlatList
              data={activeTasks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TodoItem
                  task={item}
                  deleteTask={deleteTask}
                  toggleCompleted={toggleCompleted}
                  startEditTask={startEditTask}
                  moveUp={() => moveUp(item.id)}
                  moveDown={() => moveDown(item.id)}
                  pinTask={() => pinTask(item.id)}
                  hideMoveButtons={item.pinned}
                />
              )}
              ListEmptyComponent={<Text style={styles.emptyMessage}>No tasks available.</Text>}
            />
          </>
        ) : viewPinned ? (
          <>
            <Text style={styles.sectionTitle}>Pinned Tasks</Text>
            <FlatList
              data={pinnedTasks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TodoItem
                  task={item}
                  deleteTask={deleteTask}
                  unpinTask={() => unpinTask(item.id)}
                  showUnpinButton
                  hideMoveButtons={true}
                />
              )}
              ListEmptyComponent={<Text style={styles.emptyMessage}>No pinned tasks available.</Text>}
            />
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Completed Tasks</Text>
            <FlatList
              data={completedTasks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TodoItem
                  task={item}
                  deleteTask={deleteTask}
                  restoreTask={() => restoreTask(item.id)}
                  showRestoreButton
                />
              )}
              ListEmptyComponent={<Text style={styles.emptyMessage}>No completed tasks available.</Text>}
            />
          </>
        )}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={text}
          onChangeText={setText}
          placeholder="New Task"
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>{isEditing ? 'Update' : 'Add'}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.toggleButton} onPress={toggleView}>
          <Text style={styles.toggleButtonText}>Pinned</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.toggleButton} onPress={toggleViewCompleted}>
          <Text style={styles.toggleButtonText}>Completed</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
