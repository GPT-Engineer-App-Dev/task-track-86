import { Box, VStack, Heading, Input, Button, List, ListItem, ListIcon, useColorModeValue } from '@chakra-ui/react';
import { FaTrash, FaCheckCircle } from 'react-icons/fa';
import { useState } from 'react';

const Index = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTodo = () => {
    if (input.trim() !== '') {
      setTodos([...todos, { id: Date.now(), text: input, isCompleted: false }]);
      setInput('');
    }
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleCompleteTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo));
  };

  return (
    <Box bgImage="url('/images/todo-background.jpg')" minH="100vh" py={10} px={4} bgPosition="center" bgRepeat="no-repeat" bgSize="cover">
      <VStack spacing={8} align="center">
        <Heading size="2xl" color={useColorModeValue('gray.800', 'white')}>Todo App</Heading>
        <Input
          placeholder="Add a new task..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') handleAddTodo(); }}
          size="lg"
          width="300px"
        />
        <Button colorScheme="blue" px={8} onClick={handleAddTodo}>Add Task</Button>
        <List spacing={3} width="300px">
          {todos.map(todo => (
            <ListItem key={todo.id} d="flex" justifyContent="space-between" alignItems="center" bg={useColorModeValue('gray.100', 'gray.700')} p={4} borderRadius="md">
              <ListIcon as={todo.isCompleted ? FaCheckCircle : FaTrash} color={todo.isCompleted ? 'green.500' : 'red.500'} cursor="pointer" onClick={() => todo.isCompleted ? handleDeleteTodo(todo.id) : handleCompleteTodo(todo.id)} />
              <Box as="span" textDecoration={todo.isCompleted ? 'line-through' : 'none'}>{todo.text}</Box>
            </ListItem>
          ))}
        </List>
      </VStack>
    </Box>
  );
};

export default Index;