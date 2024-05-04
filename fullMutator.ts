class PageMutator {
    private readonly FULL_NAME: string = "LastName Name Patronymic";
    private readonly testResults: HTMLElement | null = document.querySelector("dl.b-profileinfo");
    private readonly crossSpans: NodeListOf<HTMLElement> = document.querySelectorAll("span.i-icon.i-negative");
    private questionsAmount: number = Number(this.getTestRusultChildById(11).textContent!.split(" ")[2]);
    private failedQuestionsAmount: number = Math.floor(Math.random() * 3);
    private rightAnswersAmount: number = this.questionsAmount - this.failedQuestionsAmount;

    public mutateAll(): void {
        pageMutator.mutateName();
        pageMutator.mutateMode();
        pageMutator.mutateDuration();
        pageMutator.mutateGivenAnswers();
        pageMutator.mutateRightAnswers();
        pageMutator.mutateSpans();
    }

    public mutateName(): void {
        this.getTestRusultChildById(1).textContent = this.FULL_NAME;
    }

    public mutateMode(mode: string = "Самоконтроль"): void {
        this.getTestRusultChildById(5).textContent = mode;
    }

    public mutateDuration(): void {
        const inaccuracy: number = Math.floor(Math.random() * 10);
        
        this.getTestRusultChildById(9).textContent = `${this.questionsAmount + inaccuracy} минут`;
    }

    public mutateGivenAnswers(): void {
        this.getTestRusultChildById(11).textContent = `${this.questionsAmount} из ${this.questionsAmount}`;
    }

    public mutateRightAnswers(): void {
        const percentage: string = `${Math.floor((this.rightAnswersAmount * 100) / this.questionsAmount)}`;

        this.getTestRusultChildById(13).textContent = `${percentage}% (${this.rightAnswersAmount} из ${this.questionsAmount})`;
    }

    public mutateSpans(): void {
        const failedThemesIndexes: number[] = this.getFailedThemesIdexes();

        this.crossSpans.forEach((item, index) => {
            if (!failedThemesIndexes.find(value => value === index)) {
                item.classList.replace("i-negative", "i-positive");
            }
        });
    }

    private getFailedThemesIdexes(): number[] {
        const failedThemesIndexes: number[] = [];

        this.crossSpans.forEach((_, index) => {
            const randomIndex: number = Math.floor(Math.random() * 27);

            if (index === randomIndex && this.failedQuestionsAmount > 0){
                failedThemesIndexes.push(index);
            }
        });

        return failedThemesIndexes.length === this.failedQuestionsAmount ? failedThemesIndexes : this.getFailedThemesIdexes();
    }

    private getTestRusultChildById(id: number): HTMLElement {
        this.throwErrorIfTargetsAreNull();
        // @ts-ignore
        const child: HTMLElement | null = this.testResults.children.item(id) as HTMLElement;

        if (child === null) {
            throw new Error(`Child by id ${id} doesn't exist.`);
        }
        return child;
    }

    private throwErrorIfTargetsAreNull(): void {
        if (
            this.testResults === null ||
            this.testResults.children === null ||
            this.crossSpans.length <= 0
        ) {
            throw new Error("Test results or cross spans not found.");
        }
    }
}

const pageMutator = new PageMutator();

pageMutator.mutateAll();