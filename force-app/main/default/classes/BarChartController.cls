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

        DatasetWrapper dwrapper = new DatasetWrapper();
        dwrapper.label = 'Send The App';
        dwrapper.backgroundColor = 'de425b';
        dwrapper.data = new List<Integer>{50, 20, 15, 10, 12, 15, 10, 10, 50};

        //returnWrapper.datasets = new List<DatasetWrapper>{dwrapper};
        //List<DatasetWrapper> datasets_temp = new List<DatasetWrapper>();
        //datasets_temp.add(dwrapper);
        //returnWrapper.datasets = datasets_temp;

        returnWrapper.datasets = new List<DatasetWrapper>{dwrapper};
        System.debug(returnWrapper);
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

