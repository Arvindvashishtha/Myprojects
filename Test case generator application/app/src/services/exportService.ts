import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import type { TestCase } from '../types';

export const exportToExcel = (testCases: TestCase[], fileName: string = 'test-cases.xlsx') => {
    const worksheet = XLSX.utils.json_to_sheet(
        testCases.map(tc => ({
            ID: tc.id,
            Title: tc.title,
            Preconditions: tc.preconditions,
            Steps: tc.steps.join('\n'),
            'Expected Results': tc.expectedResults,
            Priority: tc.priority,
            Type: tc.testType,
            Requirements: tc.relatedRequirements || ''
        }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Test Cases');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, fileName);
};

export const exportToCSV = (testCases: TestCase[], fileName: string = 'test-cases.csv') => {
    const worksheet = XLSX.utils.json_to_sheet(testCases);
    const csvOutput = XLSX.utils.sheet_to_csv(worksheet);
    const data = new Blob([csvOutput], { type: 'text/csv;charset=utf-8' });
    saveAs(data, fileName);
};

export const exportToJSON = (testCases: TestCase[], fileName: string = 'test-cases.json') => {
    const data = new Blob([JSON.stringify(testCases, null, 2)], { type: 'application/json' });
    saveAs(data, fileName);
};

export const exportToMarkdown = (testCases: TestCase[], fileName: string = 'test-cases.md') => {
    let content = '# Generated Test Cases\n\n';
    testCases.forEach(tc => {
        content += `## ${tc.id}: ${tc.title}\n`;
        content += `**Priority**: ${tc.priority} | **Type**: ${tc.testType}\n\n`;
        content += `### Preconditions\n${tc.preconditions}\n\n`;
        content += `### Steps\n${tc.steps.map((s, i) => `${i + 1}. ${s}`).join('\n')}\n\n`;
        content += `### Expected Results\n${tc.expectedResults}\n\n`;
        content += `---\n\n`;
    });
    const data = new Blob([content], { type: 'text/markdown;charset=utf-8' });
    saveAs(data, fileName);
};
