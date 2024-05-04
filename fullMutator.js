var PageMutator = /** @class */ (function () {
    function PageMutator() {
        this.FULL_NAME = "LastName Name Patronymic";
        this.testResults = document.querySelector("dl.b-profileinfo");
        this.crossSpans = document.querySelectorAll("span.i-icon.i-negative");
        this.questionsAmount = Number(this.getTestRusultChildById(11).textContent.split(" ")[2]);
        this.failedQuestionsAmount = Math.floor(Math.random() * 3);
        this.rightAnswersAmount = this.questionsAmount - this.failedQuestionsAmount;
    }
    PageMutator.prototype.mutateAll = function () {
        pageMutator.mutateName();
        pageMutator.mutateMode();
        pageMutator.mutateDuration();
        pageMutator.mutateGivenAnswers();
        pageMutator.mutateRightAnswers();
        pageMutator.mutateSpans();
    };
    PageMutator.prototype.mutateName = function () {
        this.getTestRusultChildById(1).textContent = this.FULL_NAME;
    };
    PageMutator.prototype.mutateMode = function (mode) {
        if (mode === void 0) { mode = "Самоконтроль"; }
        this.getTestRusultChildById(5).textContent = mode;
    };
    PageMutator.prototype.mutateDuration = function () {
        var inaccuracy = Math.floor(Math.random() * 10);
        this.getTestRusultChildById(9).textContent = "".concat(this.questionsAmount + inaccuracy, " \u043C\u0438\u043D\u0443\u0442");
    };
    PageMutator.prototype.mutateGivenAnswers = function () {
        this.getTestRusultChildById(11).textContent = "".concat(this.questionsAmount, " \u0438\u0437 ").concat(this.questionsAmount);
    };
    PageMutator.prototype.mutateRightAnswers = function () {
        var percentage = "".concat(Math.floor((this.rightAnswersAmount * 100) / this.questionsAmount));
        this.getTestRusultChildById(13).textContent = "".concat(percentage, "% (").concat(this.rightAnswersAmount, " \u0438\u0437 ").concat(this.questionsAmount, ")");
    };
    PageMutator.prototype.mutateSpans = function () {
        var failedThemesIndexes = this.getFailedThemesIdexes();
        this.crossSpans.forEach(function (item, index) {
            if (!failedThemesIndexes.find(function (value) { return value === index; })) {
                item.classList.replace("i-negative", "i-positive");
            }
        });
    };
    PageMutator.prototype.getFailedThemesIdexes = function () {
        var _this = this;
        var failedThemesIndexes = [];
        this.crossSpans.forEach(function (_, index) {
            var randomIndex = Math.floor(Math.random() * 27);
            if (index === randomIndex && _this.failedQuestionsAmount > 0) {
                failedThemesIndexes.push(index);
            }
        });
        return failedThemesIndexes.length === this.failedQuestionsAmount ? failedThemesIndexes : this.getFailedThemesIdexes();
    };
    PageMutator.prototype.getTestRusultChildById = function (id) {
        this.throwErrorIfTargetsAreNull();
        // @ts-ignore
        var child = this.testResults.children.item(id);
        if (child === null) {
            throw new Error("Child by id ".concat(id, " doesn't exist."));
        }
        return child;
    };
    PageMutator.prototype.throwErrorIfTargetsAreNull = function () {
        if (this.testResults === null ||
            this.testResults.children === null ||
            this.crossSpans.length <= 0) {
            throw new Error("Test results or cross spans not found.");
        }
    };
    return PageMutator;
}());
var pageMutator = new PageMutator();
pageMutator.mutateAll();
