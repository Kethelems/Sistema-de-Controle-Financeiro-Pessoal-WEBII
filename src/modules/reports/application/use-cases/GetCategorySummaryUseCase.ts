import type { CategoryRepository } from "../../../categories/domain/repositories/CategoryRepository.js";
import type { TransactionRepository } from "../../../transactions/domain/repositories/TransactionRepository.js";

export type GetCategorySummaryInput = {
  userId: string;
  month: number;
  year: number;
};

export type CategorySummaryItem = {
  categoryId: string;
  categoryName: string;
  total: number;
};

export class GetCategorySummaryUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  public async execute(input: GetCategorySummaryInput): Promise<CategorySummaryItem[]> {
    const transactions = await this.transactionRepository.listByUserId(input.userId, {
      month: input.month,
      year: input.year
    });

    const totalsMap = new Map<string, number>();
    for (const t of transactions) {
      totalsMap.set(t.categoryId, (totalsMap.get(t.categoryId) ?? 0) + t.amount);
    }

    const categories = await this.categoryRepository.listByUserId(input.userId);

    return categories
      .filter((c) => totalsMap.has(c.id))
      .map((c) => ({ categoryId: c.id, categoryName: c.name, total: totalsMap.get(c.id)! }));
  }
}
