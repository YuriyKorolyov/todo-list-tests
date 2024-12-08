import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskComponent } from './task.component';
import { TaskService } from '../task.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { Task } from './task.model';

describe('TaskComponent', () => {
  let component: TaskComponent;
  let fixture: ComponentFixture<TaskComponent>;
  let taskService: TaskService;

  const mockTasks: Task[] = [
    { id: 1, description: 'Task 1', completed: false },
    { id: 2, description: 'Task 2', completed: true }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TaskComponent],
      providers: [
        provideHttpClientTesting(),  // используем provideHttpClientTesting для тестов HTTP
        TaskService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);

    // Мокаем сервис для предотвращения настоящих HTTP-запросов
    spyOn(taskService, 'getTasks').and.returnValue(of(mockTasks));
    fixture.detectChanges();  // Инициализация компонента
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init', () => {
    component.ngOnInit();  // Вызов ngOnInit для загрузки задач
    expect(component.tasks.length).toBe(2);
    expect(component.tasks[0].description).toBe('Task 1');
  });

  it('should display tasks in the template', () => {
    fixture.detectChanges();  // Тестируем шаблон
    const compiled = fixture.nativeElement;
    const taskItems = compiled.querySelectorAll('li');
    expect(taskItems.length).toBe(2);
    expect(taskItems[0].textContent).toContain('Task 1');
    expect(taskItems[1].textContent).toContain('Task 2');
  });
});