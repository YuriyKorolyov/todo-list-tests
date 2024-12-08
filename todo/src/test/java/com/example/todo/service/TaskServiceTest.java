package com.example.todo.service;

import com.example.todo.models.Task;
import com.example.todo.repository.TaskRepository;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class TaskServiceTest {

    @Mock
    private TaskRepository taskRepository;

    @InjectMocks
    private TaskService taskService;

    public TaskServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void testGetAllTasks() {
        when(taskRepository.findAll()).thenReturn(Arrays.asList(
                new Task("Task 1", false),
                new Task("Task 2", true)
        ));

        var tasks = taskService.getAllTasks();
        assertEquals(2, tasks.size());
    }

    @Test
    void testGetTaskById() {
        Task task = new Task("Test Task", false);
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        var result = taskService.getTaskById(1L);
        assertTrue(result.isPresent());
        assertEquals("Test Task", result.get().getDescription());
    }

    @Test
    void testCreateTask() {
        Task task = new Task("New Task", false);
        when(taskRepository.save(task)).thenReturn(task);

        var createdTask = taskService.createTask(task);
        assertNotNull(createdTask);
        assertEquals("New Task", createdTask.getDescription());
    }

    @Test
    void testDeleteTask() {
        doNothing().when(taskRepository).deleteById(1L);

        taskService.deleteTask(1L);

        verify(taskRepository, times(1)).deleteById(1L);
    }

}