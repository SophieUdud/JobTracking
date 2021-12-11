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

        // prepare Map<resumeName, Map<stageName,  count>>
		Schema.DescribeFieldResult fieldResult = Application__c.Job_Path__c.getDescribe();
		List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();

        List<String> stageNames= new List<String>();
		for( Schema.PicklistEntry pickListVal : ple){
            String stageName = pickListVal.getLabel();
            stageNames.add(stageName);
        }

        Map<String, Map<String, Integer>> resume_stage_map = new Map<String, Map<String, Integer>>();
        for (ContentDocument resume : resumes) {
            //this gets all Applications + one User link! -> later it will be filtered out to only leave the applications
            List<ContentDocumentLink> links
            = [SELECT Id, ContentDocumentId, LinkedEntityId FROM ContentDocumentLink WHERE ContentDocumentId = :resume.Id];
            List<Id> linkedEntityIds = new List<Id>();
            for (ContentDocumentLink link : links) {
                Id appId = link.LinkedEntityId;
                //only work with files that are connected to an Application__c
                if (appId.getSObjectType().getDescribe().getName() == 'Application__c') {
                   linkedEntityIds.add(appId);
                }
            }
            //all applications for the current resume for the current stage
            List<Application__c> apps = [SELECT Id, Job_Path__C FROM Application__c WHERE Id IN :linkedEntityIds];
            Map<String, Integer> stage_map = new Map<String, Integer>();
            for (String stageName : stageNames) {
                Integer resumeCount = 0;
                for (Application__c app : apps) {
                    //increase the count if the application's stage is the current stage
                    if (app.Job_Path__c == stageName) {
                        resumeCount++;
                    }
                }
                stage_map.put(stageName, resumeCount);
            }

            resume_stage_map.put(resume.Title, stage_map);
        }

        // Get info about each stage and append to datasetWrappers
        List<DatasetWrapper> datasetWrappers = new List<DatasetWrapper>();



        List<String> colors = new List<String>{'#de425b', '#f58055', '#feba65', '#fff18f', '#afd07c', '#64ad73'};
        Integer i = -1;
		for( Schema.PicklistEntry pickListVal : ple){
            i += 1;
            String stageName = pickListVal.getLabel();
            DatasetWrapper dwrapper = new DatasetWrapper();
            dwrapper.label = stageName;
            dwrapper.backgroundColor = colors[Math.mod(i ,colors.size())];

            List<Integer> dwrapper_data = new List<Integer>();
            for (String resumeName : resumeNames) {
                dwrapper_data.add(resume_stage_map.get(resumeName).get(stageName));
            }
            dwrapper.data = dwrapper_data;
            datasetWrappers.add(dwrapper);
            System.debug(stageName);
		}
        System.debug('stageNames');



        DatasetWrapper dwrapper = new DatasetWrapper();
        dwrapper.label = 'Send The Apps';
        dwrapper.backgroundColor = 'de425b';

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

