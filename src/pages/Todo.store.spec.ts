/**
 * storeのテスト
 */
import { TodoStore } from "./Todo.store";
import * as TodoRepo from "../repositories/todo.repo";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { it, vi, expect, beforeEach } from "vitest";

beforeEach(() => {
  // テスト環境でのPinia準備
  setActivePinia(
    createTestingPinia({
      stubActions: false, // actionのスタブ化を解除
    })
  );
});

it("store初期値 -> tasksは空", () => {
  const store = TodoStore();
  expect(store.tasks).toStrictEqual([]);
});

it("loadTasks実行 -> fetchTasksの結果がtasksへ格納される", async () => {
  // fetchTasksのスタブ化
  const response = [
    {
      id: 1,
      description: "task1",
    },
  ];
  vi.spyOn(TodoRepo, "fetchTasks").mockImplementation(() => {
    return Promise.resolve(response);
  });

  // loadTasksの実行
  const store = TodoStore();
  await store.loadTasks();
  expect(store.tasks).toStrictEqual(response);
});
