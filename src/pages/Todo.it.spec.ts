/**
 * storeを含んだcomponentのテスト
 */
import { createLocalVue } from "@vue/test-utils";
import { PiniaVuePlugin } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { render } from "@testing-library/vue";
import TodoComponent from "./Todo.vue";
import { expect, it, vi } from "vitest";
import { TodoStore } from "./Todo.store";

it("componentレンダリング", async () => {
  // テスト環境用のVueインスタンス生成
  const localVue = createLocalVue();
  localVue.use(PiniaVuePlugin);

  // レンダリング
  const renderResult = render(TodoComponent, {
    localVue,
    pinia: createTestingPinia({
      stubActions: false, // actionのスタブ化を解除
      plugins: [
        () => {
          const TodoStoreA = TodoStore(); // storeの呼び出し
          // loadTasksのスタブ化
          TodoStoreA.loadTasks = vi.fn().mockImplementation(() => {
            TodoStoreA.tasks = [
              {
                id: 1,
                description: "test-task1",
              },
            ];
          });
        },
      ],
    }),
  });

  expect(renderResult.html()).toContain("1: test-task1");
});
