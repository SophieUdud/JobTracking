public class BarChartController {
    @AuraEnabled(cacheable=true)
    public static ReturnWrapper getOpportunities(){

        // Get Resumes
        List<ContentDocument> resumes = [SELECT Id, Title FROM ContentDocument];

        ReturnWrapper returnWrapper = new ReturnWrapper();
        List<String> resumeNames = new List<String>();
        for (ContentDocument resume : resumes) {
            resumeNames.add(resume.Title);
        }

        returnWrapper.resumes = resumeNames;

        // Get info about each stage and append to datasetWrappers
        List<DatasetWrapper> datasetWrappers = new List<DatasetWrapper>();

        List<String> stageNames= new List<String>();
		Schema.DescribeFieldResult fieldResult = Application__c.Job_Path__c.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        List<String> colors = new List<String>{'#de425b', '#f58055', '#feba65', '#fff18f', '#afd07c', '#64ad73'};
        Integer i = -1;
		for( Schema.PicklistEntry pickListVal : ple){
            i += 1;
            String stageName = pickListVal.getLabel();
            DatasetWrapper dwrapper = new DatasetWrapper();
            dwrapper.label = stageName;
            dwrapper.backgroundColor = colors[Math.mod(i ,colors.size())];
            datasetWrappers.add(dwrapper);
            System.debug(stageName);

		}
        System.debug('stageNames');



        DatasetWrapper dwrapper = new DatasetWrapper();
        dwrapper.label = 'Send The Apps';
        dwrapper.backgroundColor = 'de425b';
        dwrapper.data = new List<Integer>{50, 20, 15, 10, 12, 15, 10, 10, 50};

        //returnWrapper.datasets = new List<DatasetWrapper>{dwrapper};
        //List<DatasetWrapper> datasets_temp = new List<DatasetWrapper>();
        //datasets_temp.add(dwrapper);
        //returnWrapper.datasets = datasets_temp;
        //datasetWrappers.add(dwrapper);
        returnWrapper.datasets = datasetWrappers;
        return returnWrapper;
    }

    public class DatasetWrapper {
        @AuraEnabled
        public String label;
        @AuraEnabled
        public String backgroundColor;
        @AuraEnabled
        public List<Integer> data;
    }

    public class ReturnWrapper {
        @AuraEnabled
        public List<DatasetWrapper> datasets;
        @AuraEnabled
        public List<String> resumes;
    }

}

